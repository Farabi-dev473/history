import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import axios from 'axios';
import { Ctx, Mutation, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { TwitterUser } from '../types';
import { getSpaceData } from '../utils/twitter-space';

const INTERVAL_TIME_IN_MS = parseInt(
  process.env.REQUEST_INTERVAL_TIME_IN_MINUTE || '100000'
);

@Resolver()
export class TwitterSpaceGiveawayResolver {
  private intervalId!: NodeJS.Timeout;

  @Mutation(() => String, { nullable: false })
  async initGiveaway(
    // @Arg('giveawayDetails') giveawayDetails: TwitterSpace,
    @Ctx() ctx: GQContext
  ) {
    const giveawayDetails = {
      spaceId: '1yoKMZanoERGQ',
      followHostRequired: true,
      minTime: 200000,
      holdingRequirements: [
        {
          numberOfNft: 2,
          collectionName: 'Moonly',
          trait: 'Body',
        },

        {
          numberOfNft: 1,
          collectionName: 'Any',
          trait: 'Background',
        },

        {
          numberOfNft: 3,
          collectionName: 'Moonly',
          trait: 'Any',
        },

        {
          numberOfNft: 4,
          collectionName: 'Any',
          trait: 'Any',
        },
      ],
      numberOfWinners: 3,
      userTypes: ['CO-HOST', 'SPEAKER', 'LISTENER'],
      prizeName: '10 SOL',
    };

    try {
      const {
        spaceId,
        followHostRequired,
        minTime,
        holdingRequirements,
        numberOfWinners,
        userTypes: eligableUserTypes,
        prizeName,
      } = giveawayDetails;

      // check if the space is already registered or not. If it's already registered send front-end an error that it's already registered.
      const space = await ctx.prisma.twitterSpace.findFirst({
        where: { space_id: spaceId },
        select: {
          space_id: true,
        },
      });

      if (space?.space_id) {
        throw new ApolloError('Giveaway for this space is already registered');
      }

      // get twitter space data
      const spaceData = await getSpaceData(spaceId);
      console.log(spaceData);
      const { state, scheduled_start } = spaceData.data.audioSpace.metadata;

      // If space ended or timedout then let front-end know about it
      if (state === 'Ended' || state === 'TimedOut') {
        throw new ApolloError(
          "Failed to register this space for giveaway cause it's ended"
        );
      }

      // if space is running or scehduled save the space giveaway constraint along with host data & scheduled time to database
      if (state === 'Running' || state === 'NotStarted') {
        const twitterSpaceUserTypes =
          await ctx.prisma.twitterSpaceUserType.findMany({
            where: {
              type: {
                in: ['CO-HOST', 'SPEAKER', 'LISTENER'],
              },
            },
          });

        // if (twitterSpaceUserTypes.length < 3) {
        //   await ctx.prisma.twitterSpaceUserType.deleteMany();
        //   await ctx.prisma.twitterSpaceUserType.createMany({
        //     data: [
        //       { type: 'CO-HOST' },
        //       { type: 'SPEAKER' },
        //       { type: 'LISTENER' },
        //     ],
        //     skipDuplicates: true,
        //   });
        // }

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
                  twitterSpace_id: spaceId,
                };
              })
          );
        });

        const newHoldingRequirements: {
          nft_id: string;
          attributeTraitId: number;
          number_of_nft: number;
          twitterSpace_id: string;
          nft_any: boolean;
          trait_any: boolean;
        }[] = [];

        const processHoldingRequirements = async () => {
          for (const requirement of holdingRequirements) {
            const newRequirement: any = {};
            console.log('HELLO');
            newRequirement.nft_id = (
              await ctx.prisma.nFT.findFirst({
                where: { name: requirement.collectionName },
              })
            )?.id as string;

            if (newRequirement.nft_id) {
              newRequirement.attributeTraitId = (
                await ctx.prisma.attributeTrait.findFirst({
                  where: { trait: requirement.trait },
                })
              )?.id as number;
            } else {
              newRequirement.attributeTraitId = (
                await ctx.prisma.attributeTrait.findFirst({
                  where: {
                    AND: [
                      { nftId: newRequirement.nft_id },
                      { trait: requirement.trait },
                    ],
                  },
                })
              )?.id as number;
            }

            newRequirement.number_of_nft = requirement.numberOfNft;

            if (requirement.collectionName === 'Any') {
              delete newRequirement.nft_id;
              newRequirement.nft_any = true;
            }

            if (requirement.trait === 'Any') {
              delete newRequirement.attributeTrait;
              newRequirement.trait_any = true;
            }

            newRequirement.twitterSpace_id = spaceId;
            console.log(newRequirement);
            newHoldingRequirements.push({ ...newRequirement });
          }
        };

        await processHoldingRequirements();

        const { title, started_at, scheduled_start } =
          spaceData.data.audioSpace.metadata;

        const { admins } = spaceData.data.audioSpace.participants;

        await ctx.prisma.twitterSpace.create({
          data: {
            space_id: spaceId,
            minimum_time: minTime,
            space_name: title,
            prize_name: prizeName,
            started_at: new Date(started_at || null),
            follow_host_required: followHostRequired,
            host_username: admins[0].twitter_screen_name,
            host_displayname: admins[0].display_name,
            host_avatar_url: admins[0].avatar_url,
            scheduled_start: new Date(scheduled_start || null),
          },
        });
        console.log('JDKFJD');
        console.log(newHoldingRequirements);
        console.log('HELLO');
        // set user holding requirements & eligable  user types for giveaway to db
        await ctx.prisma.holdingRequirement.createMany({
          data: newHoldingRequirements,
        });

        await ctx.prisma.eligableUserType.createMany({
          skipDuplicates: true,
          data: eligableTwitterUserTypes,
        });

        console.log('SPACE GIVEAWAY INITIATED');
      }

      // if space is scheduled then schedule a job to collect data of space when the space start
      if (state === 'NotStarted') {
        scheduleJob(new Date(scheduled_start), () => {
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
                      display_name: user.twitter_display_name,
                      avatar_url: user.avatar_url,
                    });
                  }
                );
              }

              if (eligableUserTypes.includes('SPEAKER')) {
                spaceData.data.audioSpace.participants.speakers.forEach(
                  (user: any) => {
                    speakers.push({
                      username: user.twitter_screen_name,
                      display_name: user.twitter_display_name,
                      avatar_url: user.avatar_url,
                    });
                  }
                );
              }

              if (eligableUserTypes.includes('LISTENER')) {
                spaceData.data.audioSpace.participants.listeners.forEach(
                  (user: any) => {
                    listeners.push({
                      username: user.twitter_screen_name,
                      display_name: user.twitter_display_name,
                      avatar_url: user.avatar_url,
                    });
                  }
                );
              }

              const liveMembers = [...coHosts, ...speakers, ...listeners];

              console.log('Collected Space User Data');
              await ctx.prisma.twitterSpaceUserDetails.updateMany({
                where: {
                  twitterSpace_id: spaceId,
                  twitterSpaceUserUsername: {
                    in: liveMembers.map((member) => member.username),
                  },
                },
                data: {
                  stay_time: {
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
                        twitterSpace_id: spaceId,
                      },
                      {
                        twitterSpaceUserUsername: {
                          in: liveMembers.map((member) => member.username),
                        },
                      },
                    ],
                  },
                })
              ).map(
                (existingMember) => existingMember.twitterSpaceUserUsername
              );

              const newMembers = liveMembers.filter(
                (liveMember) => !exisitngMembers.includes(liveMember.username)
              );

              await ctx.prisma.twitterSpaceUserDetails.createMany({
                data: newMembers.map((newMember) => {
                  return {
                    twitterSpace_id: spaceId,
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
                        twitterSpace_id: spaceId,
                      },
                      {
                        stay_time: {
                          gte: minTime,
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

              const walletAndTwitterLogedInUsers =
                await ctx.prisma.user.findMany({
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
                });

              const holdingReqConstraintFillUserIds: string[] = [];

              const holdingRequirements =
                await ctx.prisma.holdingRequirement.findMany({
                  where: { twitterSpace_id: spaceId },
                });

              walletAndTwitterLogedInUsers.map((user) => {
                const isEligableForGiveaway = holdingRequirements.every(
                  async (requirement) => {
                    let tokens: any = [];

                    if (!(requirement.nft_any || requirement.trait_any)) {
                      tokens = await ctx.prisma.nFTItem.findMany({
                        where: {
                          AND: [
                            { userId: user.id },
                            {
                              nftId: requirement.nft_id as string,
                            },
                            {
                              nft: {
                                attributesTraits: {
                                  some: {
                                    id: requirement.attributeTraitId as number,
                                  },
                                },
                              },
                            },
                          ],
                        },
                      });
                    }

                    if (requirement.nft_any && requirement.nft_any) {
                      tokens = await ctx.prisma.nFTItem.findMany({
                        where: {
                          userId: user.id,
                        },
                      });
                    }

                    if (
                      requirement.nft_any === false &&
                      requirement.trait_any === true
                    ) {
                      tokens = await ctx.prisma.nFTItem.findMany({
                        where: {
                          AND: [
                            {
                              userId: user.id,
                            },
                            {
                              nftId: requirement.nft_id as string,
                            },
                          ],
                        },
                      });
                    }

                    if (
                      requirement.nft_any === true &&
                      requirement.trait_any === false
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
                                    id: requirement.attributeTraitId as number,
                                  },
                                },
                              },
                            },
                          ],
                        },
                      });
                    }

                    if (tokens.length >= requirement.number_of_nft) {
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
                      space_id: spaceId,
                    },
                  });

                  users = users.filter(async (user) => {
                    const response = await axios.get(
                      `https://api.moon.ly/api/v1/twitter/follows/${user.twitterUserName}/${twitterSpace?.host_username}`
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
        });
      } else {
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
                    display_name: user.twitter_display_name,
                    avatar_url: user.avatar_url,
                  });
                }
              );
            }

            if (eligableUserTypes.includes('SPEAKER')) {
              spaceData.data.audioSpace.participants.speakers.forEach(
                (user: any) => {
                  speakers.push({
                    username: user.twitter_screen_name,
                    display_name: user.twitter_display_name,
                    avatar_url: user.avatar_url,
                  });
                }
              );
            }

            if (eligableUserTypes.includes('LISTENER')) {
              spaceData.data.audioSpace.participants.listeners.forEach(
                (user: any) => {
                  listeners.push({
                    username: user.twitter_screen_name,
                    display_name: user.twitter_display_name,
                    avatar_url: user.avatar_url,
                  });
                }
              );
            }

            const liveMembers = [...coHosts, ...speakers, ...listeners];

            console.log('Collected Space User Data');
            await ctx.prisma.twitterSpaceUserDetails.updateMany({
              where: {
                twitterSpace_id: spaceId,
                twitterSpaceUserUsername: {
                  in: liveMembers.map((member) => member.username),
                },
              },
              data: {
                stay_time: {
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
                      twitterSpace_id: spaceId,
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
                  twitterSpace_id: spaceId,
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
                      twitterSpace_id: spaceId,
                    },
                    {
                      stay_time: {
                        gte: minTime,
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
                where: { twitterSpace_id: spaceId },
              });

            walletAndTwitterLogedInUsers.map((user) => {
              const isEligableForGiveaway = holdingRequirements.every(
                async (requirement) => {
                  let tokens: any = [];

                  if (!(requirement.nft_any || requirement.trait_any)) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        AND: [
                          { userId: user.id },
                          {
                            nftId: requirement.nft_id as string,
                          },
                          {
                            nft: {
                              attributesTraits: {
                                some: {
                                  id: requirement.attributeTraitId as number,
                                },
                              },
                            },
                          },
                        ],
                      },
                    });
                  }

                  if (requirement.nft_any && requirement.nft_any) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        userId: user.id,
                      },
                    });
                  }

                  if (
                    requirement.nft_any === false &&
                    requirement.trait_any === true
                  ) {
                    tokens = await ctx.prisma.nFTItem.findMany({
                      where: {
                        AND: [
                          {
                            userId: user.id,
                          },
                          {
                            nftId: requirement.nft_id as string,
                          },
                        ],
                      },
                    });
                  }

                  if (
                    requirement.nft_any === true &&
                    requirement.trait_any === false
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
                                  id: requirement.attributeTraitId as number,
                                },
                              },
                            },
                          },
                        ],
                      },
                    });
                  }

                  if (tokens.length >= requirement.number_of_nft) {
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
                    space_id: spaceId,
                  },
                });

                users = users.filter(async (user) => {
                  const response = await axios.get(
                    `https://api.moon.ly/api/v1/twitter/follows/${user.twitterUserName}/${twitterSpace?.host_username}`
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
