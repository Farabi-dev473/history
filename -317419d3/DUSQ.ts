import { Prisma } from '@prisma/client';
import axios from 'axios';
import { Role } from '../schema/TwitterSpace';
import { HoldingRequirement, TwitterUser } from '../types';

const INTERVAL_TIME_IN_MS = parseInt(
  process.env.REQUEST_INTERVAL_TIME_IN_MS || '100000'
);

class TwitterSpaceUtils {
  private intervalId!: NodeJS.Timeout;

  async getSpaceData(spaceId: string) {
    try {
      const twitterAPIUrl = `https://twitter.com/i/api/graphql/SZf3Ceycp2dG7rrjd4oorg/AudioSpaceById?variables=%7B%22id%22%3A%22${spaceId}%22%2C%22isMetatagsQuery%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withReplays%22%3Atrue%7D&features=%7B%22spaces_2022_h2_clipping%22%3Atrue%2C%22spaces_2022_h2_spaces_communities%22%3Atrue%2C%22blue_business_profile_image_shape_enabled%22%3Afalse%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Afalse%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22longform_notetweets_richtext_consumption_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;

      const headers = {
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        Authorization:
          'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
        'Content-Type': 'application/json',
        'Sec-Ch-Ua':
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Linux"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'X-Csrf-Token':
          '3a1a5c0ec17e5f0254ae215bd2b7168df2d92d95902dc3657b131ad86422e529af905c92adf16088737ce4b63284f5502df9adae5b1e3a72cc062f2b5238382655b7b36d8ed43319f23893f2a5482c38',
        'X-Twitter-Active-User': 'yes',
        'X-Twitter-Auth-Type': 'OAuth2Session',
        'X-Twitter-Client-Language': 'en',
        Cookie:
          '_gid=GA1.2.683858161.1681029512; des_opt_in=Y; _gcl_au=1.1.201871213.1681034756; _ga_XESGD8ER5B=GS1.1.1681037460.1.0.1681037482.0.0.0; guest_id_ads=v1%3A168111021715726824; guest_id_marketing=v1%3A168111021715726824; guest_id=v1%3A168111021715726824; gt=1645388231540895745; g_state={"i_l":0}; kdt=WKeCKTJP1IYwrmXWK3AfbLn3neKilsXmRWxvvZpA; auth_token=b97a59f2ead87360f71b12e3d09053da58aab1af; ct0=3a1a5c0ec17e5f0254ae215bd2b7168df2d92d95902dc3657b131ad86422e529af905c92adf16088737ce4b63284f5502df9adae5b1e3a72cc062f2b5238382655b7b36d8ed43319f23893f2a5482c38; twid=u%3D1644986404571852800; att=1-qMKhn05pUsKTx7MdTyz5ToOpnTI1bQXbqecEzNvW; external_referer=padhuUp37zgV%2B7KQRP4ATTSFX5OBxOZJ|0|8e8t2xd8A2w%3D; mbox=PC#fd037a1c674e4deca930b3d42c5ffd74.38_0#1744374170|session#ce00ca8a6e1c4aea9ef4b540662080a9#1681131230; _ga_34PHSZMC42=GS1.1.1681127051.2.1.1681129623.0.0.0; lang=en; _ga=GA1.2.1774194821.1681029512; personalization_id="v1_sTD8dVUPnSqPHgA2ZAH/KA=="',
        Referer: 'https://twitter.com/home',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      };

      // fetching a random proxy
      const proxyResponse = await axios.get(
        'http://moonlyBot:lxxtDxxrPxxk@127.0.0.1:9192/v1/get_proxy'
      );

      // extracting username, password, host, port data from proxy if they exist
      const randomProxyUrl = proxyResponse.data;
      const regex = /^(?:http[s]?:\/\/)?([^:]+):([^@]+)@([^:/]+):(\d+)/;
      const match = regex.exec(randomProxyUrl);
      const axiosProxy: any = {};

      if (match) {
        const [, username, password, host, port] = match;
        axiosProxy.auth = {};

        axiosProxy.auth.username = username;
        axiosProxy.auth.password = password;
        axiosProxy.host = host;
        axiosProxy.port = port;
      }

      // making request to twitter api for getting specifc twitter space data
      const response = await axios.get(twitterAPIUrl, {
        proxy: axiosProxy,
        headers,
      });

      return response.data;
    } catch (err) {
      return (err as Error).message;
    }
  }

  async handleSpace(options: any) {
    const { spaceId, ctx, minTimeInSec, followHostRequired, numberOfWinners } =
      options;

    this.intervalId = setInterval(async () => {
      const spaceData = await this.getSpaceData(spaceId);

      const { state } = spaceData.data.audioSpace.metadata;

      if (state === 'Running') {
        const coHosts: TwitterUser[] = [];
        const speakers: TwitterUser[] = [];
        const listeners: TwitterUser[] = [];

        // get the user types which are eligable to win the giveaway for a particular space
        const eligableUserTypes = (
          await ctx.prisma.eligableUserType.findMany({
            where: {
              twitterSpaceId: spaceId,
            },
            select: {
              TwitterSpaceUserType: {
                select: {
                  type: true,
                },
              },
            },
          })
        ).map((user: any) => user.TwitterSpaceUserType?.type);

        // filter the members who are currently listening on the space based on eligbaleUserTypes constraint
        if (eligableUserTypes.includes(Role.CO_HOST)) {
          spaceData.data.audioSpace.participants.admins.shift();

          spaceData.data.audioSpace.participants.admins.forEach((user: any) => {
            coHosts.push({
              username: user.twitter_screen_name,
              displayName: user.display_name,
              avatarUrl: user.avatar_url,
            });
          });
        }

        if (eligableUserTypes.includes(Role.SPEAKER)) {
          spaceData.data.audioSpace.participants.speakers.forEach(
            (user: any) => {
              speakers.push({
                username: user.twitter_screen_name,
                displayName: user.display_name,
                avatarUrl: user.avatar_url,
              });
            }
          );
        }

        if (eligableUserTypes.includes(Role.LISTENER)) {
          spaceData.data.audioSpace.participants.listeners.forEach(
            (user: any) => {
              listeners.push({
                username: user.twitter_screen_name,
                displayName: user.display_name,
                avatarUrl: user.avatar_url,
              });
            }
          );
        }

        const liveMembers = [...coHosts, ...speakers, ...listeners];

        // update user space listening time
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

        // create users who are new
        await ctx.prisma.twitterSpaceUser.createMany({
          skipDuplicates: true,
          data: liveMembers,
        });

        // get the existing members to a particular space & filter the user who has just joined to listen the space
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
        ).map((existingMember: any) => existingMember.twitterSpaceUserUsername);

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
                (user: any) => user.twitterSpaceUserUsername
              ) as string[],
            },
          },
        });

        const walletAndTwitterLogedInUsers = await ctx.prisma.user.findMany({
          where: {
            AND: [
              {
                walletAddress: { not: null },
              },
              {
                twitterUserName: {
                  in: twitterLogedInUsers.map(
                    (user: any) => user.twitterUserName
                  ) as string[],
                },
              },
            ],
          },
        });

        const holdingReqConstraintFillUserIds: string[] = [];

        const holdingRequirements =
          await ctx.prisma.holdingRequirement.findMany({
            where: { twitterSpaceId: spaceId },
          });

        walletAndTwitterLogedInUsers.map((user: any) => {
          const isEligableForGiveaway = holdingRequirements.every(
            async (requirement: any) => {
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

            users = users.filter(async (user: any) => {
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
              in: winners.map((winner) => winner.twitterUserName) as string[],
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

  async handleHoldingRequirement(options: any) {
    const { ctx, spaceId, holdingRequirements } = options;

    const newHoldingRequirements: HoldingRequirement[] = [];

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

    return newHoldingRequirements;
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }
}

export default new TwitterSpaceUtils();
