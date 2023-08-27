import { User } from '@prisma/client';
import makeLogger from 'apps/backend/src/utils/logger';
import { wait } from 'apps/shared/src/app/scraper-utils';
import { getPrisma } from '../config/prisma';
import { ExchangeCodeResponse } from '../types';
import { getFetch } from './getFetch';

const logger = makeLogger('backend');
const { log: mLog, error: mError } = logger;
const prisma = getPrisma();

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const MOONLY_BOT_HOST = process.env.MOONLY_BOT_HOST;
const DISCORD_ACCOUNT_LINK_REDIRECT_URL =
  process.env.DISCORD_ACCOUNT_LINK_REDIRECT_URL;
const DISCORD_LOGIN_REDIRECT_URL = process.env.DISCORD_LOGIN_REDIRECT_URL;

// Twitter
const TWITTER_LOGIN_REDIRECT_URL = process.env.TWITTER_LOGIN_REDIRECT_URL;
const TWITTER_ACCOUNT_LINK_REDIRECT_URL =
  process.env.TWITTER_ACCOUNT_LINK_REDIRECT_URL;
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;

async function discordUserGuilds(accessToken: string) {
  // get the discord user's guild list
  return getFetch('https://discord.com/api/users/@me/guilds', {
    headers: { authorization: `Bearer ${accessToken}` },
  });
}

async function discordUserDetails(accessToken: string) {
  // get the discord user
  return getFetch('https://discord.com/api/users/@me', {
    headers: { authorization: `Bearer ${accessToken}` },
  });
}

async function twitterUserDetails(accessToken: string) {
  // get the twitter user
  const response = await fetch('https://api.twitter.com/2/users/me', {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  return (await response.json())?.data;
}

async function exchangeDiscordCode(code: string, isLogin: boolean) {
  let redirect_uri = DISCORD_ACCOUNT_LINK_REDIRECT_URL;

  if (isLogin) {
    redirect_uri = DISCORD_LOGIN_REDIRECT_URL;
  }

  if (!CLIENT_ID || !CLIENT_SECRET || !redirect_uri) {
    console.log('exchangeDiscordCode failed.required env missing');
    console.log('client_id: ', CLIENT_ID);
    console.log('client_secret: ', CLIENT_SECRET);
    console.log('redirect_uri: ', redirect_uri);
    throw new Error('Internal Server Error');
  }

  const body = `client_id=${encodeURIComponent(
    `${CLIENT_ID}`
  )}&client_secret=${encodeURIComponent(
    `${CLIENT_SECRET}`
  )}&grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
    `${redirect_uri}`
  )}&scope=identify%20guilds`;

  return getFetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

async function exchangeTwitterCode(code: string, isLogin: boolean) {
  let redirect_uri = TWITTER_ACCOUNT_LINK_REDIRECT_URL;

  if (isLogin) {
    redirect_uri = TWITTER_LOGIN_REDIRECT_URL;
  }

  if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET || !redirect_uri) {
    console.log('exchangeTwitterCode failed.required env missing');
    console.log('client_id: ', TWITTER_CLIENT_ID);
    console.log('client_secret: ', TWITTER_CLIENT_SECRET);
    console.log('redirect_uri: ', redirect_uri);
    throw new Error('Internal Server Error');
  }
  console.log('Hello');
  const response = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${Buffer.from(
        `${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: `code_verifier=challenge&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
  });

  return await response.json();
}

async function renewAccessToken(refresh_token: string) {
  if (!CLIENT_ID || !CLIENT_SECRET || !refresh_token) {
    console.log('renewAccessToken failed. required env missing');
    console.log('client_id: ', CLIENT_ID);
    console.log('client_secret: ', CLIENT_SECRET);
    throw new Error('Internal Server Error');
  }

  const body = `client_id=${encodeURIComponent(
    `${CLIENT_ID}`
  )}&client_secret=${encodeURIComponent(
    `${CLIENT_SECRET}`
  )}&grant_type=refresh_token&refresh_token=${refresh_token}`;

  return getFetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

async function updateUsersDBTokens(
  options: {
    id: string;
    discordAccessToken: string;
    discordRefreshToken: string;
    tokenExpireTime: Date;
  },
  retry = 0
) {
  const { id, discordAccessToken, discordRefreshToken, tokenExpireTime } =
    options;

  // ignore if user doesn't have discord and wallet both
  if (!id || !discordAccessToken || !discordRefreshToken || !tokenExpireTime) {
    throw new Error('Failed to update discord user token on DB');
  }

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        discordAccessToken,
        discordRefreshToken,
        tokenExpireTime,
      },
    });
  } catch (error: any) {
    const msg = `Error occurend in updateDiscordToken. status: ${
      error?.status
    } message: ${error?.statusText || error?.message}`;
    mError(msg, {
      hvb: 'update-user-tokens-failed',
      id,
      discordAccessToken,
      discordRefreshToken,
      tokenExpireTime,
    });

    // retry to save to db, it's very important
    retry++;
    if (retry <= 10) {
      updateUsersDBTokens(options, retry);
    } else {
      mError(msg, {
        hvb: 'update-user-tokens-failed-retry',
        id,
        discordAccessToken,
        discordRefreshToken,
        tokenExpireTime,
      });
    }
  }
}

async function checkHolderVerification(
  user: Partial<User>,
  retry = 0
): Promise<boolean> {
  const { id, walletAddress, discordUserId } = user;
  let { discordAccessToken, discordRefreshToken, tokenExpireTime } = user;

  // ignore if user doesn't have discord and wallet both
  if (
    !id ||
    !walletAddress ||
    !discordAccessToken ||
    !discordRefreshToken ||
    !discordUserId ||
    !tokenExpireTime
  ) {
    return false;
  }

  try {
    let guilds = [];
    try {
      // check tokenExpireTime
      if (isTokenExpired(tokenExpireTime)) {
        mLog(`discord accessToken expired for user: ${id}`, {
          hvb: 'discord-token-expired',
          id,
          walletAddress,
          discordAccessToken,
          discordRefreshToken,
          discordUserId,
          tokenExpireTime,
        });

        // we need to renew accessToken
        const renewedTokens: ExchangeCodeResponse = await renewAccessToken(
          discordRefreshToken
        );

        if (
          !renewedTokens.access_token ||
          !renewedTokens.refresh_token ||
          !renewedTokens.expires_in
        ) {
          mError(`discord accessToken renewal failed for user: ${id}`, {
            hvb: 'discord-token-renewal-failed',
            id,
            walletAddress,
            discordAccessToken,
            discordRefreshToken,
            discordUserId,
            tokenExpireTime,
          });
          throw new Error('Failed to renew accessToken');
        }

        discordAccessToken = renewedTokens.access_token;
        discordRefreshToken = renewedTokens.refresh_token;
        tokenExpireTime = getTokenExpireTime(renewedTokens.expires_in);

        mLog(`discord accessToken renewed for user: ${id}`, {
          hvb: 'discord-token-renewed',
          id,
          walletAddress,
          discordAccessToken,
          discordRefreshToken,
          discordUserId,
          tokenExpireTime,
        });

        // update user's db record with new tokens
        updateUsersDBTokens({
          id,
          discordAccessToken: renewedTokens.access_token,
          tokenExpireTime,
          discordRefreshToken: renewedTokens.refresh_token,
        });
      }

      // get all guilds of the user that he is a member at least
      guilds = await discordUserGuilds(discordAccessToken);
    } catch (error: any) {
      const msg = `Error occurend in getGuild/tokenRenewal. status: ${
        error?.status
      } message: ${error?.statusText || error?.message}`;

      mError(msg, {
        hvb: 'discord-fetch-failed',
        id,
        walletAddress,
        discordAccessToken,
        discordRefreshToken,
        discordUserId,
        tokenExpireTime,
      });

      // wait and retry few times
      retry++;
      if (retry <= 5) {
        await wait(retry * 1000); // wait before retry
        mError(
          `discord fetch failed. retrying for user: ${id}, retry: ${retry}`,
          {
            hvb: 'discord-fetch-retry',
            id,
            walletAddress,
            discordAccessToken,
            discordRefreshToken,
            discordUserId,
            tokenExpireTime,
          }
        );
        return checkHolderVerification(user, retry);
      } else {
        mError(
          `discord fetch failed. retry limit reached for user: ${id}, retry: ${retry}`,
          {
            hvb: 'discord-fetch-retry-limit-reached',
            id,
            walletAddress,
            discordAccessToken,
            discordRefreshToken,
            discordUserId,
            tokenExpireTime,
          }
        );
      }
    }

    // call moonly bot to check holder eligibility
    mLog(
      `Calling moonly-bot to check holder for user: ${id}, guild: ${guilds.length}`,
      {
        hvb: 'check-holder-call',
        id,
        walletAddress,
        discordAccessToken,
        discordRefreshToken,
        discordUserId,
        tokenExpireTime,
      }
    );
    const url = `${MOONLY_BOT_HOST}/api/holder/eligible`;
    await getFetch(url, {
      body: JSON.stringify({
        guilds,
        userId: id,
        discordUserId: user.discordUserId,
      }),
      method: 'post',
    });

    return true;
  } catch (error: any) {
    console.log('Error during checking holder eligibility');
    const msg = `Error occurend in checkHolderVerification. status: ${
      error?.status
    } message: ${error?.statusText || error?.message}`;
    mError(msg, {
      hvb: 'checkHolderVerification',
      id,
      walletAddress,
      discordAccessToken,
      discordRefreshToken,
      discordUserId,
      tokenExpireTime,
    });
    return false;
  }
}

function getTokenExpireTime(expires_in: number) {
  // we will get the new accessToken 6 hours before it expires
  return new Date(Date.now() + (expires_in - 21600) * 1000);
}

function isTokenExpired(expireTime: Date) {
  return new Date().getTime() > new Date(expireTime).getTime();
}

export {
  discordUserDetails,
  twitterUserDetails,
  discordUserGuilds,
  exchangeDiscordCode,
  checkHolderVerification,
  getTokenExpireTime,
  exchangeTwitterCode,
};
