import { ApolloError } from 'apollo-server-core';
import { Ctx, Mutation, Resolver } from 'type-graphql';
import { GQContext } from '../config/prisma';
import { getSpaceData } from '../utils/twitter-space';

const INTERVAL_TIME = parseInt(
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
      spaceId: '1zqKVPlQAwMJB',
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

      // // if twitter blocks our proxy & we don't get any data then make request again with new proxy otherwise stop the loop
      // for (let i = 0; i < 50; i++) {
      //   if (!spaceData?.data?.audioSpace) {
      //     console.log('Failed to fetch space data');
      //     console.error('Error: ', spaceData);
      //     spaceData = await getSpaceData(spaceId);
      //     continue;
      //   }
      //   break;
      // }

      // if space is running or scehduled save the space giveaway constraint along with host data & scheduled time to database
      if (state === 'Running' || state === 'NotStarted') {
        // get the collections & traits based on the giveaway holding requirements
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

        console.log(collectionIds);
        const traits = await ctx.prisma.attributeTrait.findMany({
          where: {
            AND: [
              {
                nftId: { in: collectionIds.map((collection) => collection.id) },
              },
              {
                trait: {
                  in: holdingRequirements.map(
                    (requirement) => requirement.trait
                  ),
                },
              },
            ],
          },
          select: {
            id: true,
            nftId: true,
          },
        });

        console.log(traits);
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
                  twitterSpace_id: spaceId,
                };
              })
          );
        });

        console.log(eligableTwitterUserTypes);
        const newHoldingRequirements: {
          nft_id: string;
          attributeTraitId: number;
          number_of_nft: number;
          twitterSpace_id: string;
          nft_any: boolean;
          trait_any: boolean;
        }[] = [];

        holdingRequirements.forEach(async (requirement) => {
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
          // console.log(newRequirement);
          newHoldingRequirements.push({ ...newRequirement });
          // console.log(newHoldingRequirements);
        });
        console.log(newHoldingRequirements);
        // newHoldingRequirements.forEach(async (requirement) => {
        //   const holdingRequirement =
        //     await ctx.prisma.holdingRequirement.findFirst({
        //       where: {
        //         nft_id: requirement.nft_id,
        //         attributeTraitId: requirement.attributeTraitId,
        //         number_of_nft: requirement.number_of_nft,
        //         twitterSpaceSpace_id: spaceId,
        //       },
        //     });

        //   if (!holdingRequirement?.id) {
        //     await ctx.prisma.holdingRequirement.create({
        //       data: requirement,
        //     });
        //   }
        // });

        // store user holding requirements for giveaway to DB

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
      //  /
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
