import { ApolloError } from 'apollo-server-core';
import { scheduleJob } from 'node-schedule';
import { Ctx, Mutation, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { getSpaceData } from '../utils/twitter-space';

const INTERVAL_TIME = parseInt(
  process.env.REQUEST_INTERVAL_TIME_IN_MINUTE || '100000'
);

@Resolver()
export class TwitterSpaceGiveawayResover {
  constructor(public intervalId: NodeJS.Timeout) {
    this.intervalId = intervalId;
  }

  @Mutation(() => String, { nullable: false })
  async initGiveaway(
    // @Arg('giveawayDetails') giveawayDetails: TwitterSpace,
    @Ctx() ctx: GQContext
  ) {
    const giveawayDetails = {
      spaceId: '1vOxwMazaWoGB',
      followHostRequired: true,
      minTime: 200000,
      holdingRequirements: [
        {
          numberOfNft: 2,
          collectionName: 'Moonly',
          trait: 'Body',
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
      let spaceData = await getSpaceData(spaceId);
      const { state, scheduled_start } = spaceData.data.audioSpace.metadata;

      if (state === 'Ended' || state === 'TimedOut') {
        throw new ApolloError(
          "Failed to register this space for giveaway cause it's ended"
        );
      }

      // if twitter blocks our proxy & we don't get any data then make request again with new proxy otherwise stop the loop
      for (let i = 0; i < 20; i++) {
        if (!spaceData?.data?.audioSpace) {
          console.log('Failed to fetch space data');
          console.error('Error: ', spaceData);
          spaceData = await getSpaceData(spaceId);
          continue;
        }
        break;
      }

      // if state is running or scehduled save the space giveaway constraint along with host data & scheduled time
      if (state === 'Running' || state === 'NotStarted') {
        const collectionIds = await ctx.prisma.nFT.findMany({
          where: {
            name: {
              in: holdingRequirements.map(
                (requirement: any) => requirement.collectionName
              ),
            },
          },
          select: {
            id: true,
          },
        });

        const traitIds = await ctx.prisma.attributeTrait.findMany({
          where: {
            trait: {
              in: holdingRequirements.map((requirement) => requirement.trait),
            },
          },
          select: {
            id: true,
          },
        });

        const twitterSpaceUserTypes =
          await ctx.prisma.twitterSpaceUserType.findMany({
            where: {
              type: {
                in: ['CO-HOST', 'SPEAKER', 'LISTENER'],
              },
            },
          });

        if (twitterSpaceUserTypes.length < 3) {
          await ctx.prisma.twitterSpaceUserType.createMany({
            data: [
              { type: 'CO-HOST' },
              { type: 'SPEAKER' },
              { type: 'LISTENER' },
            ],
            skipDuplicates: true,
          });
        }

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
        }[] = [];

        holdingRequirements.forEach(async (requirement) => {
          const newRequirement: {
            nft_id: string;
            attributeTraitId: number;
            number_of_nft: number;
          } = {
            nft_id: (
              await ctx.prisma.nFT.findFirst({
                where: { name: requirement.collectionName },
              })
            )?.id as string,
            attributeTraitId: (
              await ctx.prisma.attributeTrait.findFirst({
                where: { trait: requirement.trait },
              })
            )?.id as number,
            number_of_nft: requirement.numberOfNft,
          };

          if (requirement.collectionName === 'Any') {
            newRequirement.nft_id = '0';
          }

          if (requirement.trait === 'Any') {
            newRequirement.attributeTraitId = 0;
          }

          newHoldingRequirements.push(newRequirement);
        });

        console.log(newHoldingRequirements);
        newHoldingRequirements.forEach(async (requirement) => {
          const holdingRequirement =
            await ctx.prisma.holdingRequirement.findFirst({
              where: {
                nft_id: requirement.nft_id,
                attributeTraitId: requirement.attributeTraitId,
                number_of_nft: requirement.attributeTraitId,
                twitterSpaceSpace_id: spaceId,
              },
            });

          if (!holdingRequirement?.id) {
            await ctx.prisma.holdingRequirement.create({
              data: requirement,
            });
          }
        });

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

            for (let i = 0; i < 20; i++) {
              if (!spaceData?.data?.audioSpace) {
                console.log('Failed to fetch space data');
                console.error('Error: ', spaceData);
                spaceData = await getSpaceData(spaceId);
                continue;
              }
              break;
            }

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
                    increment: INTERVAL_TIME,
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

              console.log(exisitngMembers);
              console.log(newMembers);
              console.log(liveMembers);

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
              // filter users who listend the space minimum the minTime constraint
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
                    twitterUserName: {
                      in: twitterLogedInUsers.map(
                        (user) => user.twitterUserName
                      ) as string[],
                    },
                  },
                });

              // get wallet addresses for both twitter & wallet loged in users
              const wallets = await ctx.prisma.wallet.findMany({
                where: {
                  userId: {
                    in: walletAndTwitterLogedInUsers.map((user) => user.id),
                  },
                },
              });

              const walletAddresses = [
                ...new Set(
                  wallets
                    .map((wallet) => [wallet.address, wallet.primaryAddress])
                    .flat()
                ),
              ].filter((address) => address != null);

              // get all the tokens for the addresses
              const tokens: string[] = [];
              walletAddresses.forEach(async (address) => {
                tokens.push(
                  ...(await web3Utils.getTokensFromWallet(address as string))
                );
              });

              const nftItems = await ctx.prisma.nFTItem.findMany({
                where: {
                  id: {
                    in: tokens,
                  },
                },
              });

              const holdingReqConstraintFillUserIds: string[] = [];
              nftItems.forEach((nftItem) => {
                holdingRequirements.forEach(async (requirement) => {
                  const items = await ctx.prisma.nFTItem.findMany({
                    where: {
                      AND: [
                        {
                          id: { in: nftItems.map((nftItem) => nftItem.id) },
                        },
                        {
                          nft: {
                            AND: [
                              {
                                name: requirement.collectionName,
                              },
                              {
                                attributesTraits: {
                                  some: {
                                    trait: requirement.trait,
                                  },
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  });

                  const userIds = items.map((item) => item.userId);

                  holdingReqConstraintFillUserIds.push(
                    ...([
                      ...new Set(
                        userIds.filter((userId) => {
                          const count = userIds.reduce(
                            (acc, curr) => (curr === userId ? acc + 1 : acc),
                            0
                          );

                          return count >= requirement.numberOfNft
                            ? true
                            : false;
                        })
                      ),
                    ] as string[])
                  );
                });
              });

              let users = await ctx.prisma.user.findMany({
                where: {
                  id: {
                    in: holdingReqConstraintFillUserIds,
                  },
                },
              });

              if (followHostRequired) {
                // check whether user follows the host or not
                const twitterSpace = await ctx.prisma.twitterSpace.findFirst({
                  where: {
                    space_id: spaceId,
                  },
                });

                users = users.filter(async (user) => {
                  const response = await fetch(
                    `https://api.moon.ly/api/v1/twitter/follows/${user.twitterUserName}/${twitterSpace?.host_username}`
                  );

                  return await response.json();
                });
              }

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
          }, INTERVAL_TIME);
        });
      } else {
        this.intervalId = setInterval(async () => {
          const spaceData = await getSpaceData(spaceId);

          if (!spaceData?.data?.audioSpace) {
            console.error('Error: ', spaceData);
            throw new ApolloError('Failed to fetch space data');
          }

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
                  increment: INTERVAL_TIME,
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

            console.log(exisitngMembers);
            console.log(newMembers);
            console.log(liveMembers);

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
            // filter users who listend the space minimum the minTime constraint
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
                  twitterUserName: {
                    in: twitterLogedInUsers.map(
                      (user) => user.twitterUserName
                    ) as string[],
                  },
                },
              }
            );

            // get wallet addresses for both twitter & wallet loged in users
            const wallets = await ctx.prisma.wallet.findMany({
              where: {
                userId: {
                  in: walletAndTwitterLogedInUsers.map((user) => user.id),
                },
              },
            });

            const walletAddresses = [
              ...new Set(
                wallets
                  .map((wallet) => [wallet.address, wallet.primaryAddress])
                  .flat()
              ),
            ].filter((address) => address != null);

            // get all the tokens for the addresses
            const tokens: string[] = [];
            walletAddresses.forEach(async (address) => {
              tokens.push(
                ...(await web3Utils.getTokensFromWallet(address as string))
              );
            });

            const nftItems = await ctx.prisma.nFTItem.findMany({
              where: {
                id: {
                  in: tokens,
                },
              },
            });

            const holdingReqConstraintFillUserIds: string[] = [];
            nftItems.forEach((nftItem) => {
              holdingRequirements.forEach(async (requirement) => {
                const items = await ctx.prisma.nFTItem.findMany({
                  where: {
                    AND: [
                      {
                        id: { in: nftItems.map((nftItem) => nftItem.id) },
                      },
                      {
                        nft: {
                          AND: [
                            {
                              name: requirement.collectionName,
                            },
                            {
                              attributesTraits: {
                                some: {
                                  trait: requirement.trait,
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                });

                const userIds = items.map((item) => item.userId);

                holdingReqConstraintFillUserIds.push(
                  ...([
                    ...new Set(
                      userIds.filter((userId) => {
                        const count = userIds.reduce(
                          (acc, curr) => (curr === userId ? acc + 1 : acc),
                          0
                        );

                        return count >= requirement.numberOfNft ? true : false;
                      })
                    ),
                  ] as string[])
                );
              });
            });

            let users = await ctx.prisma.user.findMany({
              where: {
                id: {
                  in: holdingReqConstraintFillUserIds,
                },
              },
            });

            if (followHostRequired) {
              // check whether user follows the host or not
              const twitterSpace = await ctx.prisma.twitterSpace.findFirst({
                where: {
                  space_id: spaceId,
                },
              });

              users = users.filter(async (user) => {
                const response = await fetch(
                  `https://api.moon.ly/api/v1/twitter/follows/${user.twitterUserName}/${twitterSpace?.host_username}`
                );

                return await response.json();
              });
            }

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
        }, INTERVAL_TIME);
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
