import { ApolloError } from 'apollo-server-core';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { Role, TwitterSpace, Winner } from '../schema/TwitterSpace';
import { HoldingRequirement } from '../types';
import twitterSpaceUtils from '../utils/twitter-space';

const INTERVAL_TIME_IN_MS = parseInt(
  process.env.REQUEST_INTERVAL_TIME_IN_MINUTE || '100000'
);

@Resolver()
export class TwitterSpaceGiveawayResolver {
  private intervalId!: NodeJS.Timeout;

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
      },
    });

    return winners;
  }

  @Mutation(() => String, { nullable: false })
  async initGiveaway(
    // @Arg('giveawayDetails') giveawayDetails: TwitterSpace,
    @Ctx() ctx: GQContext
  ) {
    const giveawayDetails: TwitterSpace = {
      spaceId: '1gqGvyEnLjnKB',
      minTimeInSec: 20000, // seconds
      followHostRequired: true,
      eligableUserTypes: [Role.CO_HOST, Role.LISTENER, Role.SPEAKER],
      holdingRequirements: [
        {
          numOfNFT: 2,
          collectionName: 'Moonly',
          trait: 'Background',
        },
      ],
      prizeName: '10 SOL',
      numberOfWinners: 10,
    };

    try {
      const {
        spaceId,
        followHostRequired,
        minTimeInSec,
        holdingRequirements,
        numberOfWinners,
        eligableUserTypes,
        prizeName,
      } = giveawayDetails;

      // check if the space is already registered or not. If it's already registered send front-end an error that it's already registered.
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
      const { state, scheduled_start } = spaceData.data.audioSpace.metadata;

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
                in: ['CO-HOST', 'SPEAKER', 'LISTENER'],
              },
            },
          });

        if (twitterSpaceUserTypes.length < 3) {
          await ctx.prisma.twitterSpaceUserType.deleteMany();
          await ctx.prisma.twitterSpaceUserType.createMany({
            data: [
              { type: 'CO-HOST' },
              { type: 'SPEAKER' },
              { type: 'LISTENER' },
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

        const newHoldingRequirements: HoldingRequirement[] = [];

        await twitterSpaceUtils.handleHoldingRequirement({ spaceId, ctx });

        const { title, started_at, scheduled_start } =
          spaceData.data.audioSpace.metadata;

        const { admins } = spaceData.data.audioSpace.participants;

        await ctx.prisma.twitterSpace.create({
          data: {
            id: spaceId,
            minTimeInSec: minTimeInSec,
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

      // if space is scheduled then schedule a job to collect data of space when the space start else start listening the space

      if (state === 'NotStarted') {
        scheduleJob(new Date(scheduled_start), async () => {
          await twitterSpaceUtils.handleSpace({
            spaceId,
            ctx,
            minTimeInSec,
            followHostRequired,
            numberOfWinners,
          });
        });
      } else {
        await twitterSpaceUtils.handleSpace({
          spaceId,
          ctx,
          minTimeInSec,
          followHostRequired,
          numberOfWinners,
        });
      }
      return spaceId;
    } catch (err) {
      throw new ApolloError((err as Error).message);
    }
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }
}

function scheduleJob(arg0: Date, arg1: () => void) {
  throw new Error('Function not implemented.');
}
