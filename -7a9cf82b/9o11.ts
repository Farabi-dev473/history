import { Prisma } from '@prisma/client';
import { PublicKey } from '@solana/web3.js';
import { createReadStream } from 'fs';
import { get } from 'https';
import { sign } from 'tweetnacl';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { v4 as uuidV4 } from 'uuid';
import { serverStaticDir } from '../config/createExpressApp';
import { getPrisma, GQContext } from '../config/prisma';
import { getRedis } from '../config/redis';
import { LinkPayload, User, Wallet } from '../schema/User';
import { ExchangeCodeResponse } from '../types';
import {
  isValidWalletAddress,
  makeValidUrlSlug,
  signJWT,
  validateUrlSlug,
} from '../utils/common-utils';
import {
  checkHolderVerification,
  discordUserDetails,
  exchangeDiscordCode,
  exchangeTwitterCode,
  getTokenExpireTime,
  twitterUserDetails,
} from '../utils/hvb';
import upload from '../utils/upload';

type PrismaUser = Prisma.UserGetPayload<{
  include: {
    autoAlert: true;
  };
}>;

const message = 'moonly-is-awesome';

@Resolver()
export class AccountLinkingResolver {
  private redis = getRedis();

  @Authorized(['HOLDER', 'USER', 'ADMIN'])
  @Mutation(() => LinkPayload, { nullable: true })
  async linkWallet(
    @Arg('wallet') wallet: string,
    @Ctx() ctx: GQContext
  ): Promise<Partial<LinkPayload>> {
    if (!isValidWalletAddress(wallet)) {
      throw new Error('Invalid wallet address.');
    }

    // check if this wallet is already exists or not
    const existingUser = await ctx.prisma.user.findFirst({
      where: {
        walletAddress: wallet,
        NOT: {
          id: ctx.user.id,
        },
      },
      select: { id: true, owner: true },
    });

    if (existingUser) {
      const { id, owner } = existingUser;

      if (owner) return { isLinked: false, mergeable: true };

      const accountLinked = await this.saveUsersInOwnerTable([id, ctx.user.id]);

      if (accountLinked) return { isLinked: false, mergeable: true };

      return { isLinked: false };
    }

    // update wallet address of the user
    await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: { walletAddress: wallet },
    });
    // await web3Utils.updateUserWalletInfo(wallet);

    return { isLinked: true };
  }

  @Authorized(['HOLDER', 'USER', 'ADMIN'])
  @Mutation(() => User, { nullable: false })
  async unlinkWallet(@Ctx() ctx: GQContext, @Arg('wallet') wallet: string) {
    // check if user has discord linked before ulinking his wallet
    // const foundUser = await ctx.prisma.user.findFirst({
    //   where: { id: ctx.user.id },
    // });

    const walletAccount = await ctx.prisma.wallet.findUnique({
      where: { address: wallet },
      include: { user: { include: { wallets: true } } },
    });

    if (!walletAccount) {
      throw new Error('No Account Found With This Wallet Address');
    }

    if (walletAccount.userId !== ctx.user.id) {
      throw new Error("Wallet doesn't belong to your account");
    }

    if (
      !walletAccount.user?.discordUserId &&
      (walletAccount.user?.wallets.length || 0) < 2
    ) {
      throw new Error(
        `Can't unlink wallet as it's the primary way of accessing your account. Please set up an alternative(e.g discord,anoter wallet) before unlinking. `
      );
    }

    // update wallet address to initial state
    let data = { wallets: { disconnect: { address: wallet } } } as any;
    if (
      walletAccount.primaryAddress &&
      walletAccount.primaryAddress === wallet
    ) {
      data = {
        walletAddress: null,
        role: 'USER',
        walletNftItems: { set: [] },
        primaryWallet: { disconnect: true },
        ...data,
      };
    }

    const user = await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data,
      include: { wallets: true },
    });
    user.password = null;
    return user;
  }

  @Authorized(['HOLDER', 'USER', 'ADMIN'])
  @Mutation(() => LinkPayload, { nullable: true })
  async linkDiscord(
    @Arg('code', { nullable: false }) code: string,
    @Ctx() ctx: GQContext
  ) {
    const cacheKey = `discord_token_response:${code}`;

    // check wheteher we already got the token response from discord or not
    const cacheTokenResponse = await this.redis.get(cacheKey);
    let tokenResponseData = {} as unknown as ExchangeCodeResponse;
    if (cacheTokenResponse) {
      tokenResponseData = JSON.parse(cacheTokenResponse);
    } else {
      // exchange discord authorization code
      try {
        tokenResponseData = await exchangeDiscordCode(code, false);
      } catch (error: any) {
        throw new Error(error?.statusText || 'Bad Request');
      }
    }

    const {
      access_token,
      refresh_token,
      scope = '',
      expires_in,
    } = tokenResponseData;
    if (
      !access_token ||
      !refresh_token ||
      !scope ||
      !scope.includes('guilds') ||
      !expires_in
    ) {
      throw new Error('Bad Request');
    }

    // get the discord user using accessToken
    const discordUser = await discordUserDetails(access_token);

    if (!discordUser || !discordUser.id) throw new Error('Bad Request');

    const existingUser = await ctx.prisma.user.findFirst({
      where: {
        discordUserId: discordUser.id,
        NOT: {
          id: ctx.user.id,
        },
      },
      select: { id: true, owner: true },
    });

    // got previous account with same discordUsriId but they are not same account
    // need to merge
    if (existingUser) {
      const { owner, id } = existingUser;

      // save token response for later use
      await this.redis.set(
        cacheKey,
        JSON.stringify(tokenResponseData),
        'EX',
        2 * 60 // 2 min
      );

      // owner exists return mergeable
      if (owner) return { isLinked: false, mergeable: true };

      // else keep track on owner table
      const isCreated = await this.saveUsersInOwnerTable([
        id || '',
        ctx.user.id,
      ]);

      if (isCreated) return { isLinked: false, mergeable: true };

      return { isLinked: false };
    }

    // check if user has name already
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.user.id },
      select: {
        name: true,
        avatar: true,
      },
    });

    if (!user) throw new Error("User doesn't exist");

    let imageUrl = user.avatar;

    // Take image from discord if current avatar is empty
    if (user && !imageUrl && discordUser.avatar) {
      const url = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
      imageUrl = await new Promise((resolve, reject) => {
        try {
          get(url, async (stream) => {
            const localUrl = await upload.imageUpload(
              { createReadStream: () => stream, filename: 'avatar.png' } as any,
              `users/${ctx.user.id}`,
              'avatar'
            );
            resolve(localUrl);
          });
        } catch (error) {
          reject(null);
        }
      });
    }

    // update the existing db user's discordUserId for future
    // usages like discord login update the db user
    const data = {
      discordUserId: discordUser.id,
      name: user.name ? user.name : discordUser.username,
      avatar: imageUrl,
      hasRequiredDiscordPermission: true,
      discordAccessToken: access_token,
      discordRefreshToken: refresh_token,
      tokenExpireTime: getTokenExpireTime(expires_in),
    };

    const updatedUser = await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data,
    });

    // check if this user is eligible to become a holder in bot or not
    checkHolderVerification(updatedUser);

    return { isLinked: true };
  }

  /**
   * Link the user accounts to the Owner table for later use [like merging]
   */
  private async saveUsersInOwnerTable(users: string[]) {
    const ownerId = uuidV4();
    try {
      await getPrisma().$transaction([
        getPrisma().user.update({
          where: { id: users[0] },
          // create the owner and link this user to it
          data: { owner: { create: { id: ownerId } } },
        }),
        getPrisma().user.update({
          where: { id: users[1] },
          // link the previously created owner table with this user table
          data: { owner: { connect: { id: ownerId } } },
        }),
      ]);

      return true;
    } catch (error) {
      return false;
    }
  }

  @Authorized(['HOLDER', 'USER', 'ADMIN'])
  @Mutation(() => User, { nullable: false })
  async unlinkDiscord(@Ctx() ctx: GQContext) {
    // check if user has wallet linked before ulinking his discord
    const foundUser = await ctx.prisma.user.findFirst({
      where: { id: ctx.user.id },
    });

    if (!foundUser?.walletAddress) {
      throw new Error(
        `Can't unlink discord as it's the primary way of accessing your account. Please set up an alternative(e.g wallet) before unlinking. `
      );
    }

    // set discordUserId to initial state
    const user = await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        discordUserId: null,
        discordAccessToken: null,
        discordRefreshToken: null,
        tokenExpireTime: null,
      },
    });

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async loginTwitter(
    @Arg('code', { nullable: false }) code: string,
    @Ctx() ctx: GQContext
  ) {
    console.log(code);
    // exchange twitter authorization code
    const tokenResponseData: ExchangeCodeResponse = await exchangeTwitterCode(
      code,
      true
    );

    console.log(tokenResponseData);

    const {
      access_token,
      refresh_token,
      scope = '',
      expires_in,
    } = tokenResponseData;
    console.log(tokenResponseData);
    if (!access_token || !refresh_token || !scope || !expires_in) {
      throw new Error('Bad Request');
    }

    // get the twitter user using accessToken
    const twitterUser = await twitterUserDetails(access_token);
    console.log(twitterUser);
    if (!twitterUser || !twitterUser.id) throw new Error('Bad Request');
    console.log(twitterUser);
    let userName = null;

    if (twitterUser.username) {
      if (validateUrlSlug(twitterUser.username)) {
        userName = twitterUser.username;
      } else {
        userName = makeValidUrlSlug(twitterUser.username);
      }

      const user = await ctx.prisma.user.findUnique({
        where: { userName: userName },
      });

      if (user) userName = `${userName}_${uuidV4()}`;
    }
    console.log(userName);
    const user = await ctx.prisma.user.upsert({
      where: { twitterUserId: twitterUser.id },
      create: {
        twitterUserId: twitterUser.id,
        userName: userName,
        autoAlert: {
          create: {
            name: 'floor_price gets INCREASE by 50% within 24h',
            alert_by: ['PUSH_NOTIFICATION'],
            conditions: {
              createMany: {
                data: [
                  {
                    data_point: 'floor_price',
                    comparison_operator: 'ABOVE',
                    operation: 'OR',
                    value: 50,
                    percentage: true,
                    percentagePeriod: 24,
                  },
                  {
                    data_point: 'floor_price',
                    comparison_operator: 'BELOW',
                    operation: 'AND',
                    value: -50,
                    percentage: true,
                    percentagePeriod: 24,
                  },
                ],
              },
            },
            auto_alert: true,
          },
        },
        name: twitterUser.username,
        hasRequiredDiscordPermission: true,
        twitterAccessToken: access_token,
        twitterRefreshToken: refresh_token,
        twitterTokenExpireTime: getTokenExpireTime(expires_in),
      },
      update: {
        hasRequiredDiscordPermission: true,
        twitterAccessToken: access_token,
        twitterRefreshToken: refresh_token,
        twitterTokenExpireTime: getTokenExpireTime(expires_in),
      },
    });
    console.log(user);
    // Fetch the twitter image and save and update user avatar
    if (user && !user.avatar) {
      const url = `https://twitter.com/${twitterUser.username}/photo`;
      get(url, async (stream) => {
        const imageUrl = await upload.imageUpload(
          { createReadStream: () => stream, filename: 'avatar.png' } as any,
          `users/${user.id}`,
          'avatar'
        );
        await ctx.prisma.user.update({
          where: { id: user.id },
          data: { avatar: imageUrl },
        });
      });
    }

    const jwtKeys: any = {};

    if (user?.email) jwtKeys.email = user?.email;
    if (user?.walletAddress) jwtKeys.walletAddress = user?.walletAddress;

    const token = signJWT({
      ...jwtKeys,
      id: user?.id,
      role: user?.role,
    });

    const avatar =
      user.avatar ||
      (twitterUser.avatar && `/uploads/users/${user.id}/avatar.png`);
    const { password: _, ...sanitizedUser } = user;
    return { ...sanitizedUser, token, avatar: avatar };
  }

  @Mutation(() => User, { nullable: true })
  async loginDiscord(
    @Arg('code', { nullable: false }) code: string,
    @Ctx() ctx: GQContext
  ) {
    // exchange discord authorization code
    const tokenResponseData: ExchangeCodeResponse = await exchangeDiscordCode(
      code,
      true
    );

    const {
      access_token,
      refresh_token,
      scope = '',
      expires_in,
    } = tokenResponseData;
    if (
      !access_token ||
      !refresh_token ||
      !scope ||
      !scope.includes('guilds') ||
      !expires_in
    ) {
      throw new Error('Bad Request');
    }

    // get the discord user using accessToken
    const discordUser = await discordUserDetails(access_token);
    if (!discordUser || !discordUser.id) throw new Error('Bad Request');

    let userName = null;

    if (discordUser.username) {
      if (validateUrlSlug(discordUser.username)) {
        userName = discordUser.username;
      } else {
        userName = makeValidUrlSlug(discordUser.username);
      }

      const user = await ctx.prisma.user.findUnique({
        where: { userName: userName },
      });
      if (user) userName = `${userName}_${uuidV4()}`;
    }

    const user = await ctx.prisma.user.upsert({
      where: { discordUserId: discordUser.id },
      create: {
        discordUserId: discordUser.id,
        userName: userName,
        autoAlert: {
          create: {
            name: 'floor_price gets INCREASE by 50% within 24h',
            alert_by: ['PUSH_NOTIFICATION'],
            conditions: {
              createMany: {
                data: [
                  {
                    data_point: 'floor_price',
                    comparison_operator: 'ABOVE',
                    operation: 'OR',
                    value: 50,
                    percentage: true,
                    percentagePeriod: 24,
                  },
                  {
                    data_point: 'floor_price',
                    comparison_operator: 'BELOW',
                    operation: 'AND',
                    value: -50,
                    percentage: true,
                    percentagePeriod: 24,
                  },
                ],
              },
            },
            auto_alert: true,
          },
        },
        name: discordUser.username,
        hasRequiredDiscordPermission: true,
        discordAccessToken: access_token,
        discordRefreshToken: refresh_token,
        tokenExpireTime: getTokenExpireTime(expires_in),
      },
      update: {
        hasRequiredDiscordPermission: true,
        discordAccessToken: access_token,
        discordRefreshToken: refresh_token,
        tokenExpireTime: getTokenExpireTime(expires_in),
      },
    });

    // Fetch the discord image and save and update user avatar
    if (user && !user.avatar && discordUser.avatar) {
      const url = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
      get(url, async (stream) => {
        const imageUrl = await upload.imageUpload(
          { createReadStream: () => stream, filename: 'avatar.png' } as any,
          `users/${user.id}`,
          'avatar'
        );
        await ctx.prisma.user.update({
          where: { id: user.id },
          data: { avatar: imageUrl },
        });
      });
    }

    const jwtKeys: any = {};

    if (user?.email) jwtKeys.email = user?.email;
    if (user?.walletAddress) jwtKeys.walletAddress = user?.walletAddress;

    const token = signJWT({
      ...jwtKeys,
      id: user?.id,
      role: user?.role,
    });

    const avatar =
      user.avatar ||
      (discordUser.avatar && `/uploads/users/${user.id}/avatar.png`);
    const { password: _, ...sanitizedUser } = user;
    return { ...sanitizedUser, token, avatar: avatar };
  }

  @Authorized(['ADMIN', 'HOLDER', 'USER'])
  @Mutation(() => Wallet, { nullable: true })
  async linkAnotherWallet(
    @Arg('address') address: string,
    @Arg('signature') signature: string,
    @Ctx() ctx: GQContext
  ) {
    const signableMessage = await ctx.prisma.signatureMessage.findUnique({
      where: { walletAddress: address },
    });

    if (!signableMessage || !signableMessage.message) {
      throw new Error('Failed To Verify Wallet');
    }

    // Give 1 minute time for sending after generating the message
    const elapsed = Date.now() - signableMessage.createdAt.getTime();
    const expireTime = 1000 * 60; // 1 min;

    if (elapsed > expireTime) {
      throw new Error('Authentication Time-Out Try Again');
    }

    const isValidSign = sign.detached.verify(
      new TextEncoder().encode(signableMessage.message),
      new Uint8Array(Buffer.from(signature, 'base64')),
      new PublicKey(address).toBytes()
    );

    if (!isValidSign) {
      throw new Error('Invalid Wallet Signature');
    }

    // if (!ctx.user.walletAddress) {
    //   throw new Error('Please Login With Wallet');
    // }

    {
      const wallet = await ctx.prisma.wallet.findUnique({ where: { address } });

      if (wallet?.userId) {
        throw Error('Wallet Is Linked With Another Account');
      }
    }

    const wallet = await ctx.prisma.wallet.upsert({
      where: {
        address: address,
      },
      create: {
        address: address,
        userId: ctx.user.id,
      },
      update: {
        userId: ctx.user.id,
      },
    });

    return wallet;
  }

  @Authorized(['HOLDER', 'USER', 'ADMIN'])
  @Mutation(() => User, { nullable: true })
  async setWalletAsPrimary(
    @Ctx() ctx: GQContext,
    @Arg('address') address: string
  ) {
    if (!isValidWalletAddress(address)) {
      throw new Error('Invalid Wallet Address');
    }
    const walletAccount = await ctx.prisma.wallet.findUnique({
      where: { address },
      include: {
        user: {
          include: { wallets: true, primaryWallet: true },
        },
      },
    });

    if (!walletAccount?.user) {
      throw new Error('Wallet is not connected to user');
    }

    if (walletAccount?.primaryAddress) {
      throw new Error('Wallet is already used as primary wallet');
    }

    if (ctx.user.id !== walletAccount.userId) {
      throw new Error('Invalid user account');
    }

    const user = await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        walletAddress: address,
        primaryWallet: {
          connect: { address },
          // disconnect: true
        },
      },
      include: {
        wallets: true,
        primaryWallet: true,
      },
    });

    const token = signJWT({
      email: user.email,
      id: user.id,
      walletAddress: user?.walletAddress,
      role: user?.role,
    });

    const { password: _, ...sanitizedUser } = user;
    return { ...sanitizedUser, token };
  }

  @Authorized(['HOLDER', 'USER', 'ADMIN'])
  @Mutation(() => User, { nullable: true })
  async mergeAccount(@Ctx() ctx: GQContext) {
    try {
      const loggedInUser = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
        include: {
          autoAlert: true,
          owner: {
            include: {
              User: {
                include: {
                  autoAlert: true,
                },
              },
            },
          },
        },
      });

      if (!loggedInUser || !loggedInUser?.ownerId) {
        throw new Error('No linked user account found!');
      }

      const currentUserId = loggedInUser?.id;
      let mergeUserId: string | null = null;
      let mergeUser = {} as PrismaUser;
      const updatedFields = {} as Prisma.UserCreateManyInput;

      loggedInUser?.owner?.User.forEach((account) => {
        if (!mergeUserId && account.id !== currentUserId) {
          mergeUserId = account.id;
          mergeUser = account;
        }
      });

      if (!mergeUserId) throw new Error('No linked user account found!');

      // Update all the null fields
      Object.keys(loggedInUser).forEach((k) => {
        const key = k as keyof Prisma.UserCreateManyInput;
        const currValue = loggedInUser[key];
        const mergeValue = mergeUser[key];

        if (
          currValue !== false &&
          !currValue &&
          mergeValue &&
          typeof mergeValue !== 'object'
        ) {
          updatedFields[key] = mergeValue as any;
        }
      });

      // Update User role
      if (loggedInUser.role === 'USER' && mergeUser.role === 'HOLDER') {
        updatedFields['role'] = 'HOLDER';
      }

      // Update all the reference collection
      if (currentUserId && mergeUserId) {
        const payload = {
          where: { userId: mergeUserId },
          data: { userId: currentUserId },
        };
        const pendingUpdates = [
          ctx.prisma.nFTItem.updateMany(payload),
          ctx.prisma.bookmarkNFT.updateMany(payload),
          ctx.prisma.device.updateMany(payload),
          ctx.prisma.alert.updateMany(payload),
          ctx.prisma.reminder.updateMany(payload),
        ];
        if (!loggedInUser.autoAlert && mergeUser.autoAlert) {
          pendingUpdates.push(ctx.prisma.autoAlert.updateMany(payload));
        }

        await ctx.prisma.$transaction(pendingUpdates);
      }

      await ctx.prisma.$transaction([
        ctx.prisma.owner.delete({ where: { id: loggedInUser.ownerId } }),
        ctx.prisma.user.delete({ where: { id: mergeUserId } }),
      ]);

      if (!loggedInUser.avatar && mergeUser.avatar) {
        const localUrl = await upload.imageUpload(
          {
            createReadStream: () =>
              createReadStream(`${serverStaticDir}/${mergeUser.avatar}`),
            filename: mergeUser.avatar,
          } as any,
          `users/${ctx.user.id}`
        );
        if (localUrl) {
          updatedFields.avatar = localUrl;
        } else {
          delete updatedFields.avatar;
        }
      }
      await upload.deleteUserDir(mergeUser.id);

      if (Object.keys(updatedFields).length > 0) {
        // we need to remove another user avatar because if we
        // remove that user cache files avatar url will be null then

        return ctx.prisma.user.update({
          where: { id: currentUserId },
          data: updatedFields,
        });
      }
    } catch (err) {
      console.log('🚀 ~ Merging error', err);
      throw new Error(
        "An error occured in the server while merging. Couldn't complete merge!"
      );
    }
  }
}
