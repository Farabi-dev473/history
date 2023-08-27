import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import axios from 'axios';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { Winner } from '../schema/TwitterSpace';
import { TwitterUser } from '../types';
import { getSpaceData } from '../utils/twitter-space';

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
    const giveawayDetails = {
      spaceId: '1yoKMZanoERGQ',
      followHostRequired: true,
      minTimeInSec: 200000,
      holdingRequirements: [
        {
          numOfNFT: 2,
          collectionName: 'Moonly',
          trait: 'Body',
        },

        {
          numOfNFT: 1,
          collectionName: 'Any',
          trait: 'Background',
        },

        {
          numOfNFT: 3,
          collectionName: 'Moonly',
          trait: 'Any',
        },

        {
          numOfNFT: 4,
          collectionName: 'Any',
          trait: 'Any',
        },
      ],
      numberOfWinners: 3,
      userTypes: ['CO-HOST', 'SPEAKER', 'LISTENER'],
      prizeName: '10 SOL',
    };

    // validate the user input
    const {
      spaceId,
      minTimeInSec,
      followHostRequired,
      holdingRequirements,
      numberOfWinners,
      prizeName,
      userTypes,
    } = giveawayDetails;

    // validate the user input
    if (typeof spaceId !== 'string' || spaceId.length > 15) {
      throw new ApolloError('The space id you provided was invalid');
    }

    // validate the user input
    if (typeof minTimeInSec !== 'string' || spaceId.length > 15) {
      throw new ApolloError('The space id you provided was invalid');
    }

    // validate the user input
    if (typeof spaceId !== 'string' || spaceId.length > 15) {
      throw new ApolloError('The space id you provided was invalid');
    }

    // validate the user input
    if (typeof spaceId !== 'string' || spaceId.length > 15) {
      throw new ApolloError('The space id you provided was invalid');
    }

    try {
      const {
        spaceId,
        followHostRequired,
        minTimeInSec,
        holdingRequirements,
        numberOfWinners,
        userTypes: eligableUserTypes,
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
      const spaceData = await getSpaceData(spaceId);
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

        const newHoldingRequirements: {
          nftId: string;
          traitId: number;
          numOfNFT: number;
          twitterSpaceId: string;
          anyNFT: boolean;
          anyTrait: boolean;
        }[] = [];

        const processHoldingRequirements = async () => {
          for (const requirement of holdingRequirements) {
            const newRequirement: any = {};

            newRequirement.nftId = (
              await ctx.prisma.nFT.findFirst({
                where: { name: requirement.collectionName },
              })
            )?.id as string;

            if (!newRequirement.nftId) {
              newRequirement.traitId = (
                await ctx.prisma.attributeTrait.findFirst({
                  where: { trait: requirement.trait },
                })
              )?.id as number;
            } else {
              newRequirement.traitId = (
                await ctx.prisma.attributeTrait.findFirst({
                  where: {
                    AND: [
                      { nftId: newRequirement.nftId },
                      { trait: requirement.trait },
                    ],
                  },
                })
              )?.id as number;
            }

            newRequirement.numOfNFT = requirement.numOfNFT;

            if (requirement.collectionName === 'Any') {
              delete newRequirement.nftId;
              newRequirement.anyNFT = true;
            }

            if (requirement.trait === 'Any') {
              delete newRequirement.traitId;
              newRequirement.anyTrait = true;
            }

            newRequirement.twitterSpaceId = spaceId;

            newHoldingRequirements.push({ ...newRequirement });
          }
        };

        await processHoldingRequirements();

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

      const handleSpace = async () => {
        this.intervalId = setInterval(async () => {
          const spaceData = await getSpaceData(spaceId);

          const { state } = spaceData.data.audioSpace.metadata;

          if (state === 'Running') {
            const coHosts: TwitterUser[] = [];
            const speakers: TwitterUser[] = [];
            const listeners: TwitterUser[] = [];

            if (eligableUserTypes.includes('CO-HOST')) {
              spaceData.data.audioSpace.participants.admins.shift();

              spaceData.data.audioSpace.participants.admins.forEach(
                (user: any) => {
                  coHosts.push({
                    username: user.twitter_screen_name,
                    displayName: user.twitter_display_name,
                    avatarUrl: user.avatar_url,
                  });
                }
              );
            }

            if (eligableUserTypes.includes('SPEAKER')) {
              spaceData.data.audioSpace.participants.speakers.forEach(
                (user: any) => {
                  speakers.push({
                    username: user.twitter_screen_name,
                    displayName: user.twitter_display_name,
                    avatarUrl: user.avatar_url,
                  });
                }
              );
            }

            if (eligableUserTypes.includes('LISTENER')) {
              spaceData.data.audioSpace.participants.listeners.forEach(
                (user: any) => {
                  listeners.push({
                    username: user.twitter_screen_name,
                    displayName: user.twitter_display_name,
                    avatarUrl: user.avatar_url,
                  });
                }
              );
            }

            const liveMembers = [...coHosts, ...speakers, ...listeners];

            console.log('Collected Space User Data');
            await ctx.prisma.twitterSpaceUserDetails.updateMany({
              where: {
                twitterSpaceId: spaceId,
                twitterSpaceUserUsername: {
                  in: liveMembers.map((member) => member.username),
                },
              },
              data: {
                stayedTimeInSec: {
                  increment: INTERVAL_TIME_IN_MS / 1000,
                },
              },
            });

            await ctx.prisma.twitterSpaceUser.createMany({
              skipDuplicates: true,
              data: liveMembers,
            });

            const exisitngMembers = (
              await ctx.prisma.twitterSpaceUserDetails.findMany({
                where: {
                  AND: [
                    {
                      twitterSpaceId: spaceId,
                    },
                    {
                      twitterSpaceUserUsername: {
                        in: liveMembers.map((member) => member.username),
                      },
                    },
                  ],
                },
              })
            ).map((existingMember) => existingMember.twitterSpaceUserUsername);

            const newMembers = liveMembers.filter(
              (liveMember) => !exisitngMembers.includes(liveMember.username)
            );

            await ctx.prisma.twitterSpaceUserDetails.createMany({
              data: newMembers.map((newMember) => {
                return {
                  twitterSpaceId: spaceId,
                  twitterSpaceUserUsername: newMember.username,
                };
              }),
            });
          }

          if (state === 'Ended' || state === 'TimedOut') {
            // filter users who listend the space minimum time
            const usersFillContraintMinTime =
              await ctx.prisma.twitterSpaceUserDetails.findMany({
                where: {
                  AND: [
                    {
                      twitterSpaceId: spaceId,
                    },
                    {
                      stayedTimeInSec: {
                        gte: minTimeInSec,
                      },
                    },
                  ],
                },
                select: {
                  twitterSpaceUserUsername: true,
                },
              });

            // filter users who has logged in with both twitter & wallet
            const twitterLogedInUsers = await ctx.prisma.user.findMany({
              where: {
                twitterUserName: {
                  in: usersFillContraintMinTime.map(
                    (user) => user.twitterSpaceUserUsername
                  ) as string[],
                },
              },
            });

            const walletAndTwitterLogedInUsers = await ctx.prisma.user.findMany(
              {
                where: {
                  AND: [
                    {
                      walletAddress: { not: null },
                    },
                    {
                      twitterUserName: {
                        in: twitterLogedInUsers.map(
                          (user) => user.twitterUserName
                        ) as string[],
                      },
                    },
                  ],
                },
              }
            );

            const holdingReqConstraintFillUserIds: string[] = [];

            const holdingRequirements =
              await ctx.prisma.holdingRequirement.findMany({
                where: { twitterSpaceId: spaceId },
              });

            walletAndTwitterLogedInUsers.map((user) => {
              const isEligableForGiveaway = holdingRequirements.every(
                async (requirement) => {
                  let tokens: any = [];

                  if (!(requirement.anyNFT || requirement.anyTrait)) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        AND: [
                          { userId: user.id },
                          {
                            nftId: requirement.nftId as string,
                          },
                          {
                            nft: {
                              attributesTraits: {
                                some: {
                                  id: requirement.traitId as number,
                                },
                              },
                            },
                          },
                        ],
                      },
                    });
                  }

                  if (requirement.anyNFT && requirement.anyNFT) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        userId: user.id,
                      },
                    });
                  }

                  if (
                    requirement.anyNFT === false &&
                    requirement.anyTrait === true
                  ) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        AND: [
                          {
                            userId: user.id,
                          },
                          {
                            nftId: requirement.nftId as string,
                          },
                        ],
                      },
                    });
                  }

                  if (
                    requirement.anyNFT === true &&
                    requirement.anyTrait === false
                  ) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        AND: [
                          {
                            userId: user.id,
                          },
                          {
                            nft: {
                              attributesTraits: {
                                some: {
                                  id: requirement.traitId as number,
                                },
                              },
                            },
                          },
                        ],
                      },
                    });
                  }

                  if (
                    requirement &&
                    requirement.numOfNFT &&
                    tokens.length >= requirement.numOfNFT
                  ) {
                    return true;
                  }

                  return false;
                }
              );

              if (isEligableForGiveaway) {
                holdingReqConstraintFillUserIds.push(user.id);
              }
            });

            let users = await ctx.prisma.user.findMany({
              where: {
                id: {
                  in: holdingReqConstraintFillUserIds,
                },
              },
            });

            const handleFollowHostProcess = async () => {
              if (followHostRequired) {
                // check whether user follows the host or not
                const twitterSpace = await ctx.prisma.twitterSpace.findFirst({
                  where: {
                    id: spaceId,
                  },
                });

                users = users.filter(async (user) => {
                  const response = await axios.get(
                    `https://api.moon.ly/api/v1/twitter/follows/${user.twitterUserName}/${twitterSpace?.hostUsername}`
                  );

                  await response.data;
                });
              }
            };

            await handleFollowHostProcess();
            // selected randomly winners
            const winners: Prisma.UserCreateInput[] = [];

            for (let i = 0; i < numberOfWinners; i++) {
              const winnerIndex = Math.floor(Math.random() * users.length);
              if (!winners.includes(users[winnerIndex])) {
                winners.push(users[winnerIndex]);
              }
            }

            // store the winner information
            await ctx.prisma.twitterSpaceUserDetails.updateMany({
              where: {
                twitterSpaceUserUsername: {
                  in: winners.map(
                    (winner) => winner.twitterUserName
                  ) as string[],
                },
              },
              data: {
                winner: true,
              },
            });

            this.clearInterval();
          }
        }, INTERVAL_TIME_IN_MS);
      };

      // if space is scheduled then schedule a job to collect data of space when the space start
      if (state === 'NotStarted') {
        scheduleJob(new Date(scheduled_start), async () => {
          await handleSpace();
        });
      } else {
        await handleSpace();
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
