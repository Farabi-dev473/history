import { ApolloError } from 'apollo-server-core';
import { GraphQLBoolean } from 'graphql';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { GiveawayInput, Role, Winner } from '../schema/TwitterSpace';
import { scheduleJob } from '../utils/common-utils';
import twitterSpaceUtils from '../utils/twitter-space';

@Resolver()
export class TwitterSpaceGiveawayResolver {
  @Query(() => [Winner], { nullable: false })
  async showGiveawayWinners(
    @Arg('spaceId') spaceId: string,
    @Ctx() ctx: GQContext
  ) {
    // validate the user input
    if (typeof spaceId !== 'string' || spaceId.length > 15) {
      throw new ApolloError('The space id you provided was invalid');
    }
    // If space doesn't exist then throw error
    const twitterSpace = await ctx.prisma.twitterSpace.findFirst({
      where: { id: spaceId as string },
    });

    if (!twitterSpace?.id) {
      throw new ApolloError('This space was not monitored');
    }

    // find & return the winners
    const winners = await ctx.prisma.twitterSpaceUserDetails.findMany({
      where: {
        AND: [
          {
            twitterSpaceId: spaceId as string,
          },
          {
            winner: true,
          },
        ],
      },
      select: {
        TwitterSpaceUser: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
        TwitterSpace: {
          select: {
            spaceName: true,
            startedAt: true,
            endedAt: true,
            prizeName: true,
            hostUsername: true,
            hostAvatarUrl: true,
          },
        },
      },
    });

    return winners;
  }

  @Mutation(() => GraphQLBoolean, { nullable: false })
  async initGiveaway(
    @Arg() giveawayDetails: GiveawayInput,
    @Ctx() ctx: GQContext
  ) {
    try {
      const {
        spaceId,
        minTimeInSec,
        eligableUserTypes,
        followHostRequired,
        holdingRequirements,
        prizeName,
        numberOfWinners,
      } = giveawayDetails;
      // if the space was already initiated then let the front-end know about it
      const space = await ctx.prisma.twitterSpace.findFirst({
        where: {
          id: spaceId,
        },
        select: {
          id: true,
        },
      });

      if (space?.id) {
        throw new ApolloError('Giveaway for this space is already registered');
      }

      // get twitter space data
      const spaceData = await twitterSpaceUtils.getSpaceData(spaceId);

      // if don't get users data from twitter space, let the front-end know about it
      if (!spaceData?.data?.audioSpace?.participants) {
        throw new ApolloError(
          "Space isn't available or couldn't get data from twitter space"
        );
      }

      const { state, scheduled_start, title, started_at } =
        spaceData.data.audioSpace.metadata;
      const { admins } = spaceData.data.audioSpace.participants;

      // If space ended or timedout then let front-end know about it
      if (state === 'Ended' || state === 'TimedOut') {
        throw new ApolloError(
          "Failed to register this space for giveaway cause it's ended"
        );
      }

      // if space is running or scehduled save the space giveaway constraint along with host data & scheduled time to database
      if (state === 'Running' || state === 'NotStarted') {
        // if twitter space user types doesn't exist in db then create those
        const twitterSpaceUserTypes =
          await ctx.prisma.twitterSpaceUserType.findMany({
            where: {
              type: {
                in: [Role.CO_HOST, Role.SPEAKER, Role.LISTENER],
              },
            },
          });

        if (twitterSpaceUserTypes.length < 3) {
          await ctx.prisma.twitterSpaceUserType.deleteMany();
          await ctx.prisma.twitterSpaceUserType.createMany({
            data: [
              { type: Role.CO_HOST },
              { type: Role.SPEAKER },
              { type: Role.LISTENER },
            ],
            skipDuplicates: true,
          });
        }

        // filter the user types which are eligable to win the giveaway
        const eligableTwitterUserTypes: any[] = [];
        eligableUserTypes.forEach((eligableUserType) => {
          eligableTwitterUserTypes.push(
            ...twitterSpaceUserTypes
              .filter(
                (twitterUserType) => twitterUserType.type === eligableUserType
              )
              .map((user) => {
                return {
                  twitterSpaceUserTypeId: user.id,
                  twitterSpaceId: spaceId,
                };
              })
          );
        });

        // get holding requirments id to store in db with their name
        const newHoldingRequirements =
          await twitterSpaceUtils.handleHoldingRequirement({
            spaceId,
            ctx,
            holdingRequirements,
          });

        const { admins } = spaceData.data.audioSpace.participants;

        // set twitter space constraints to db
        await ctx.prisma.twitterSpace.create({
          data: {
            id: spaceId,
            minTimeInSec: minTimeInSec,
            numberOfWinners,
            spaceName: title,
            prizeName: prizeName,
            startedAt: new Date(started_at || null),
            followHostRequired: followHostRequired,
            hostUsername: admins[0].twitter_screen_name,
            hostDisplayname: admins[0].display_name,
            hostAvatarUrl: admins[0].avatar_url,
            scheduledStart: new Date(scheduled_start || null),
          },
        });

        // set user holding requirements & eligable  user types for giveaway to db
        await ctx.prisma.holdingRequirement.createMany({
          data: newHoldingRequirements,
        });

        await ctx.prisma.eligableUserType.createMany({
          skipDuplicates: true,
          data: eligableTwitterUserTypes,
        });
      }

      // if space is shceduled then set scheduler so that when time comes it continiously listen the space & update data
      if (state === 'NotStarted') {
        scheduleJob(scheduled_start, async () => {
          await twitterSpaceUtils.handleSpace({
            spaceId,
            ctx,
            minTimeInSec,
            followHostRequired,
            numberOfWinners,
          });
        });
      } else {
        // if not scheduled then just continiously listen the space & update data
        await twitterSpaceUtils.handleSpace({
          spaceId,
          ctx,
          minTimeInSec,
          followHostRequired,
          numberOfWinners,
        });
      }

      return true;
    } catch (err) {
      if (err instanceof ApolloError) {
        throw err;
      } else {
        console.error('Error: ', (err as Error).message);
        throw new Error('Internal Server Error');
      }
    }
  }
}
