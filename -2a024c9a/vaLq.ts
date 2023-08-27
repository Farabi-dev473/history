/* eslint-disable no-useless-escape */
import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import axios from 'axios';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { YoutubeTranscript } from 'youtube-transcript';
import { GQContext } from '../config/prisma';
import { MatchedVideo, Video } from '../schema/ytVideoProcessing';

@Resolver()
export class YTVideoProcessingResolver {
  // @Authorized(['Holder', 'User', 'Admin'])
  @Mutation(() => Boolean, { nullable: false })
  async processVideos(
    @Arg('videos', () => [Video]) videos: Video[],
    @Ctx() ctx: GQContext
  ) {
    try {
      // get the transcripts from twitter
      const fetchTranscripts = async (videos: Video[]) => {
        const videoIds = videos.map((video) => video.id);
        const promises = videoIds.map(async (videoId) => {
          const transcripts = await YoutubeTranscript.fetchTranscript(videoId, {
            lang: 'en',
          });

          const transcript = transcripts.reduce((acc, curr) => {
            acc += ` [${Math.floor(curr.offset / 1000)}] ${curr.text}`;
            return acc;
          }, '');

          return transcript;
        });

        return await Promise.all(promises);
      };

      const transcripts = (await fetchTranscripts(videos)).map((transcript) =>
        transcript.toLocaleLowerCase().replace(/[.,]/g, '')
      );
      const fetchVideoDetails = async (videos: Video[]) => {
        const promises = videos.map(async ({ id: videoId }, index) => {
          const { data } = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
          );

          if (!data.items[0].snippet.title) {
            throw new Error(`Failed to fetch video title for ${videoId}`);
          }

          return {
            id: videoId,
            title: data.items[0].snippet.title,
            transcript: transcripts[index],
          };
        });

        return await Promise.all(promises);
      };

      const videoData = await fetchVideoDetails(videos);

      await ctx.prisma.video.createMany({
        data: videoData,
        skipDuplicates: true,
      });
      await ctx.prisma.videoAuthor.createMany({
        data: videos.map((video) => {
          return {
            authorId: ctx.user.id,
            videoId: video.id,
          };
        }),
        skipDuplicates: true,
      });

      return true;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message);
    }
  }

  @Query(() => [MatchedVideo], { nullable: false })
  async searchPhrase(@Arg('phrase') phrase: string, @Ctx() ctx: GQContext) {
    console.log(phrase);
    try {
      await ctx.prisma.$queryRaw(
        Prisma.sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`
      );
      await ctx.prisma.$queryRaw(
        Prisma.sql`CREATE INDEX IF NOT EXISTS trgm_index ON Video USING gin(transcript gin_trgm_ops);`
      );

      const data = await ctx.prisma.$queryRaw(
        Prisma.sql`
        SELECT substring(transcript, '/(\[[^\]]*\])[^[]*?\b(?:${phrase})\b/g')
        FROM video
        WHERE word_similarity(transcript, '${phrase}') > 0.7;`
      );

      // const videoIds = [...new Set(data.map(({ videoId }) => videoId))];
      // data = data.filter((phrase) => {
      //   if (videoIds.includes(phrase.videoId)) {
      //     videoIds.splice(videoIds.indexOf(phrase.videoId), 1);
      //     return true;
      //   }
      // });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message);
    }
  }
}
