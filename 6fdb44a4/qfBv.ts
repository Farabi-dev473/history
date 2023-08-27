import { Ctx, Mutation, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { TwitterSpace } from '../schema/TwitterSpace';
import { TwitterUser } from '../types';
import { getSpaceData } from '../utils/twitterSpace';
const INTERVAL_TIME = parseInt(process.env.REQUEST_INTERVAL_TIME_IN_MINUTE);

@Resolver()
export class TwitterSpaceGiveawayResover {
  // @Mutation(() => TwitterSpace, { nullable: true })
  // async initGiveaway(
  //   // @Arg('giveawayDetails') giveawayDetails: TwitterSpace,
  //   @Ctx() ctx: GQContext
  // ) {
  //   const giveawayDetails = {
  //     spaceId: '1lDxLnrrqeLGm',
  //     followHostRequired: false,
  //     minTime: 2,
  //     holdingRequirements: [
  //       {
  //         numberOfNft: 2,
  //         collectionName: 'Moonly',
  //         trait: 'Body',
  //       },
  //     ],
  //     numberOfWinners: 3,
  //     userTypes: ['CO-HOST', 'SPEAKER', 'LISTENER'],
  //     prizeName: '10 SOL',
  //   };
  //   try {
  //     const {
  //       spaceId,
  //       followHostRequired,
  //       minTime,
  //       holdingRequirements,
  //       numberOfWinners,
  //       userTypes,
  //       prizeName,
  //     } = giveawayDetails;

  //     const spaceData = await getSpaceData(spaceId);
  //     console.log(spaceData);
  //     if (typeof spaceData !== 'object') throw new Error('Bad Request');

  //     const spaceState = spaceData?.data?.audioSpace?.metadata?.state;
  //     console.log(spaceState);
  //     if (spaceState === 'NotStarted') {
  //       // schedule the job here
  //     }

  //     let isSpaceStarted = false;
  //     if (spaceState === 'Running') {
  //       console.log('SPACE IS RUNNING');
  //       const { title, started_at } = spaceData.data.audioSpace.metadata;
  //       const { admins } = spaceData.data.audioSpace.participants;

  //       if (!isSpaceStarted) {
  //         console.log('HELLO');
  //         isSpaceStarted = true;
  //         console.log('HELLO2');
  //         const collectionIds = await ctx.prisma.nFT.findMany({
  //           where: {
  //             name: {
  //               in: holdingRequirements.map(
  //                 (requirement: any) => requirement.collectionName
  //               ),
  //             },
  //           },
  //           select: {
  //             id: true,
  //           },
  //         });
  //         console.log('Collection Ids', collectionIds);
  //         const traitIds = await ctx.prisma.attributeTrait.findMany({
  //           where: {
  //             trait: {
  //               in: holdingRequirements.map((requirement) => requirement.trait),
  //             },
  //           },
  //           select: {
  //             id: true,
  //           },
  //         });

  //         console.log('TraitIds', traitIds);
  //         const userTypes = await ctx.prisma.twitterSpaceUserType.findMany({
  //           where: {
  //             type: {
  //               in: ['CO-HOST', 'SPEAKER', 'LISTENER'],
  //             },
  //           },
  //         });

  //         console.log(userTypes);

  //         if (userTypes.length === 0) {
  //           await ctx.prisma.twitterSpaceUserType.createMany({
  //             data: [
  //               { type: 'CO-HOST' },
  //               { type: 'SPEAKER' },
  //               { type: 'LISTENER' },
  //             ],
  //             skipDuplicates: true,
  //           });
  //         }
  //         // const eligableUserTypes: Prisma.TwitterSpaceUserTypeCreateInput[] =
  //         [];

  //         const twitterUserTypes = ['CO-HOST', 'SPEAKER', 'LISTENER'];

  //         let eligableUserTypes: Prisma.TwitterSpaceUserTypeCreateInput[] =
  //           userTypes.filter((userType) => twitterUserTypes.includes(userType));

  //         eligableUserTypes = await ctx.prisma.twitterSpaceUserType.findMany({
  //           where: {
  //             type: {
  //               in: eligableUserTypes,
  //             },
  //           },
  //           select: {
  //             id: true,
  //             type: true,
  //           },
  //         });

  //         console.log(eligableUserTypes);

  //         console.log('ELIGABLE USEr');

  //         holdingRequirements.forEach((requirement) => {
  //           if (requirement.trait === 'Any') traitIds.push({ id: 0 });
  //         });

  //         console.log('HOLDING REQUIREMENTS DONE');

  //         const isSpaceExist = await ctx.prisma.twitterSpace.findFirst({
  //           where: {
  //             space_id: {
  //               equals: spaceId,
  //             },
  //           },
  //           select: {
  //             space_id: true,
  //           },
  //         });

  //         if (!isSpaceExist) {
  //           const data = await ctx.prisma.twitterSpace.create({
  //             data: {
  //               space_id: spaceId,
  //               minimum_time: minTime,
  //               space_name: title,
  //               started_at: new Date(started_at),
  //               prize_name: prizeName,
  //               follow_host_required: followHostRequired,
  //               host_username: admins[0]?.twitter_screen_name,
  //               host_displayname: admins[0]?.display_name,
  //               // add host avatar here & in schema & migrate those
  //               holding_requirements: {
  //                 createMany: {
  //                   data: holdingRequirements.map((requirement, index) => {
  //                     return {
  //                       number_of_nft: requirement.numberOfNft,
  //                       nft_id: collectionIds[index].id,
  //                       attributeTraitId: traitIds[index]?.id,
  //                     };
  //                   }),
  //                 },
  //               },
  //             },
  //           });
  //           console.log('HELLO');
  //           await ctx.prisma.eligableUserType.createMany({
  //             data: eligableUserTypes.map((eligableUser) => {
  //               console.log('HELLOOLOOOO');
  //               return {
  //                 twitterSpace_id: spaceId,
  //                 twitterSpaceUserTypeId: eligableUser.id,
  //               };
  //             }),
  //           });

  //           console.log('HELLLLLLLLl');
  //         }
  //       }
  //     }
  //     console.log('NEVER MIND');
  //     console.log(data);
  //     console.log('SPACE data stored');
  //     const { speakers, listeners } = spaceData.data.audioSpace.participants;
  //     const activeMembers = [];

  //     for (let i = 0; i < 3; i++) {
  //       const userType = userTypes[i].type;

  //       if (userType === 'CO-HOST') {
  //         coHosts = spaceData?.data?.audioSpace.participants.admins.shift();
  //       }

  //       if (userType === 'SPEAKER') {
  //         speakers = spaceData?.data?.audioSpace?.participants.speakers;
  //       }

  //       if (userType === 'LISTENER') {
  //         listeners = spaceData?.data?.audioSpace?.participants.listeners;
  //       }
  //     }

  //     userTypes.forEach((userType) => {
  //       if (userType === 'CO-HOST') {
  //         admins.shift().forEach((coHost) => {
  //           activeMembers.push({
  //             username: coHost.twitter_screen_name,
  //             display_name: coHost.twitter_displayname,
  //             avatar_url: coHost.avatar_url,
  //           });
  //         });
  //       }

  //       if (userType === 'SPEAKER') {
  //         speakers.forEach((speaker) => {
  //           activeMembers.push({
  //             username: speaker.twitter_screen_name,
  //             display_name: speaker.twitter_displayname,
  //             avatar_url: speaker.avatar_url,
  //           });
  //         });
  //       }

  //       if (userType === 'LISTENER') {
  //         listeners.forEach((listener) => {
  //           activeMembers.push({
  //             username: listener.twitter_screen_name,
  //             display_name: listener.twitter_displayname,
  //             avatar_url: listener.avatar_url,
  //           });
  //         });
  //       }
  //     });

  //     await ctx.prisma.twitterSpaceUser.updateMany({
  //       where: {
  //         username: {
  //           in: activeMembers.map((activeMember) => activeMember.username),
  //         },
  //       },

  //       data: {
  //         stay_time: {
  //           increment: INTERVAL_TIME,
  //         },
  //       },
  //     });

  //     await ctx.prisma.twitterSpaceUser.createMany({
  //       skipDuplicates: true,
  //       data: activeMembers,
  //     });
  //   } catch (err) {
  //     // fix time format schema for twitter space
  //     // fix twitter space non-null property to null because the data are comming from twitter
  //     console.log(err);
  //     return { errMsg: (err as Error).message };
  //   }
  // }

  @Mutation(() => TwitterSpace, { nullable: false })
  async initGiveaway2(
    // @Arg('giveawayDetails') giveawayDetails: TwitterSpace,
    @Ctx() ctx: GQContext
  ) {
    const giveawayDetails = {
      spaceId: '1lDxLnrrqeLGm',
      followHostRequired: false,
      minTime: 2,
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
        throw new Error('Bad Request');
      }

      const spaceData = await getSpaceData(spaceId);
      if (typeof spaceData !== 'object') throw new Error('Bad Request');

      const { state } = spaceData.data.audioSpace.metadata;
      let spaceStarted = false;

      if (state === 'Running') {
        if (!spaceStarted) {
          spaceStarted = true;

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

          await ctx.prisma.twitterSpaceUserType.createMany({
            data: [
              { type: 'CO-HOST' },
              { type: 'SPEAKER' },
              { type: 'LISTENER' },
            ],
            skipDuplicates: true,
          });

          const twitterUserTypes =
            await ctx.prisma.twitterSpaceUserType.findMany({});

          const giveawayEligableUsers = [];

          eligableUserTypes.forEach((eligableUserType) => {
            giveawayEligableUsers.push(
              twitterUserTypes.find(
                (twitterUserType) => twitterUserType.type === eligableUserType
              )
            );
          });

          holdingRequirements.forEach((requirement) => {
            if (requirement.trait === 'Any') traitIds.push({ id: 0 });
          });

          const { title, started_at } = spaceData.data.audioSpace.metadata;

          const { admins } = spaceData.data.audioSpace.participants;

          const twitterSpace = await ctx.prisma.twitterSpace.create({
            data: {
              space_id: spaceId,
              minimum_time: minTime,
              space_name: title,
              started_at: new Date(started_at),
              prize_name: prizeName,
              follow_host_required: followHostRequired,
              host_username: admins[0]?.twitter_screen_name,
              host_displayname: admins[0]?.display_name,
              // add host avatar here & in schema & migrate those
              holding_requirements: {
                createMany: {
                  data: holdingRequirements.map((requirement, index) => {
                    return {
                      number_of_nft: requirement.numberOfNft,
                      nft_id: collectionIds[index].id,
                      attributeTraitId: traitIds[index]?.id,
                    };
                  }),
                },
              },

              eligable_user_types: {
                createMany: {
                  data: giveawayEligableUsers.map((eligableUser) => {
                    return {
                      twitterSpaceUserTypeId: eligableUser.id,
                    };
                  }),
                },
              },
            },
          });
        } else {
          setInterval(async () => {
            const coHosts: TwitterUser[] = [];
            const speakers: TwitterUser[] = [];
            const listeners: TwitterUser[] = [];

            if (eligableUserTypes.includes('CO-HOST')) {
              spaceData.data.audioSpace.participants.admins.shift();

              spaceData.data.audioSpace.participants.admins.forEach(
                (user: any) => {
                  coHosts.push({
                    twitterSpace_id: spaceId,
                    username: user.twitter_screen_name,
                    display_name: user.twitter_displayname,
                    avatar_url: user.avatar_url,
                  });
                }
              );
            }

            if (eligableUserTypes.includes('SPEAKER')) {
              spaceData.data.audioSpace.participants.speakers.forEach(
                (user: any) => {
                  speakers.push({
                    twitterSpace_id: spaceId,
                    username: user.twitter_screen_name,
                    display_name: user.twitter_displayname,
                    avatar_url: user.avatar_url,
                  });
                }
              );
            }

            if (eligableUserTypes.includes('LISTENER')) {
              spaceData.data.audioSpace.participants.listeners.forEach(
                (user: any) => {
                  listeners.push({
                    twitterSpace_id: spaceId,
                    username: user.twitter_screen_name,
                    display_name: user.twitter_displayname,
                    avatar_url: user.avatar_url,
                  });
                }
              );
            }

            const liveMembers = [...coHosts, ...speakers, ...listeners];
            console.log('2');
            await ctx.prisma.twitterSpaceUser.updateMany({
              where: {
                AND: [
                  { twitterSpace_id: spaceId },
                  {
                    username: {
                      in: liveMembers.map((member) => member.username),
                    },
                  },
                ],
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
          }, INTERVAL_TIME);
        }

        const coHosts: TwitterUser[] = [];
        const speakers: TwitterUser[] = [];
        const listeners: TwitterUser[] = [];

        if (eligableUserTypes.includes('CO-HOST')) {
          spaceData.data.audioSpace.participants.admins.shift();

          spaceData.data.audioSpace.participants.admins.forEach((user: any) => {
            coHosts.push({
              twitterSpace_id: spaceId,
              username: user.twitter_screen_name,
              display_name: user.twitter_displayname,
              avatar_url: user.avatar_url,
            });
          });
        }

        if (eligableUserTypes.includes('SPEAKER')) {
          spaceData.data.audioSpace.participants.speakers.forEach(
            (user: any) => {
              speakers.push({
                twitterSpace_id: spaceId,
                username: user.twitter_screen_name,
                display_name: user.twitter_displayname,
                avatar_url: user.avatar_url,
              });
            }
          );
        }

        if (eligableUserTypes.includes('LISTENER')) {
          spaceData.data.audioSpace.participants.listeners.forEach(
            (user: any) => {
              listeners.push({
                twitterSpace_id: spaceId,
                username: user.twitter_screen_name,
                display_name: user.twitter_displayname,
                avatar_url: user.avatar_url,
              });
            }
          );
        }

        const liveMembers = [...coHosts, ...speakers, ...listeners];
        console.log('2');
        await ctx.prisma.twitterSpaceUser.updateMany({
          where: {
            AND: [
              { twitterSpace_id: spaceId },
              {
                username: {
                  in: liveMembers.map((member) => member.username),
                },
              },
            ],
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
      }
    } catch (err) {
      console.log(err.message);
      return { err: (err as Error).message };
    }
  }
}
