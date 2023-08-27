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
      console.log(videos[0].id);
      // get the transcripts from twitter
      let phrases;
      const fetchPhrases = async (videos: Video[]) => {
        const videoIds = videos.map((video) => video.id);
        const promises = videoIds.map(async (videoId) => {
          const transcripts = await YoutubeTranscript.fetchTranscript(videoId);
          const phrase = transcripts.map((transcript) => {
            return {
              text: transcript.text,
              timeInSec: Math.floor(transcript.offset / 1000),
              videoId,
            };
          });
          return phrase;
        });

        phrases = await Promise.all(promises);
        phrases = phrases.flat(2);
      };

      await fetchPhrases(videos);

      const user = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.user.id,
        },
        select: { id: true },
      });

      let videosData;
      const fetchVideoDetails = async (videos: Video[]) => {
        const promises = videos.map(async ({ id: videoId }) => {
          const { data } = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
          );

          if (!data.items[0].snippet.title) {
            throw new Error(`Failed to fetch video title for ${videoId}`);
          }

          return {
            id: videoId,
            title: data.items[0].snippet.title,
          };
        });

        videosData = await Promise.all(promises);
      };

      await fetchVideoDetails(videos);

      await ctx.prisma.video.createMany({
        data: videosData,
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
      await ctx.prisma.phrase.createMany({
        data: phrases,
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
      let data = await ctx.prisma.phrase.findMany({
        where: {
          AND: [
            {
              text: {
                search: phrase.split(' ').join(' + '),
              },
            },
            {
              video: {
                videoAuthors: {
                  some: {
                    authorId: ctx.user.id,
                  },
                },
              },
            },
          ],
        },
        select: {
          videoId: true,
          timeInSec: true,
        },
      });

      const videoIds = [...new Set(data.map(({ videoId }) => videoId))];
      data = data.filter((phrase) => {
        if (videoIds.includes(phrase.videoId)) {
          videoIds.splice(videoIds.indexOf(phrase.videoId), 1);
          return true;
        }
      });
      return data;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message);
    }
  }
}
