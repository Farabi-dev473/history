import { Prisma } from '@prisma/client';
import { getPrisma } from 'apps/backend/src/config/prisma';
import { getRedis } from 'apps/backend/src/config/redis';
import { searchClient } from 'apps/backend/src/utils/search';
import { Request, Response, Router } from 'express';
const router = Router();
const prisma = getPrisma();
const redis = getRedis();

router.get('/traits', async (req: Request, res: Response) => {
  try {
    const { projectIds = [] } = req.query;

    const idSet = new Set(projectIds as string[]);
    const traits = [];

    // try to find from cache
    for (const id of idSet) {
      const cacheKey = `moonl_bot_api:collections:${id}:traits'`;
      const dataFromCache = await redis.get(cacheKey);

      if (dataFromCache) {
        traits.push({
          projectId: id,
          traits: JSON.parse(dataFromCache),
        });

        idSet.delete(id);
      }
    }

    const nfts = await prisma.nFT.findMany({
      where: {
        id: {
          in: [...idSet],
        },
      },
      select: {
        id: true,
        attributesTraits: true,
      },
    });

    for (const { id, attributesTraits } of nfts) {
      traits.push({
        projectId: id,
        traits: attributesTraits,
      });

      // set results to cache for 1 hour
      const cacheKey = `moonl_bot_api:collections:${id}:traits'`;
      redis.set(cacheKey, JSON.stringify(attributesTraits), 'EX', 3600);
    }

    res.json({
      status: true,
      traits,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err?.message || 'Something went wrong',
    });
  }
});

router.get(
  '/:id/traits/:traitId/values',
  async (req: Request, res: Response) => {
    try {
      const { id, traitId } = req.params;

      // try to find from cache
      const cacheKey = `moonl_bot_api:collections:${id}:traits:${traitId}:values'`;
      const dataFromCache = await redis.get(cacheKey);

      if (dataFromCache) {
        return res.json({
          status: true,
          values: JSON.parse(dataFromCache),
        });
      }

      const trait = await prisma.attributeTrait.findUnique({
        where: {
          id: Number(traitId),
        },
        include: {
          values: {
            orderBy: {
              value: 'asc',
            },
          },
        },
      });

      const values = trait?.values || [];

      // set results to cache for 1 hour
      redis.set(cacheKey, JSON.stringify(values), 'EX', 3600);

      res.json({
        status: true,
        values,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: false,
        message: err?.message || 'Something went wrong',
      });
    }
  }
);

router.get(
  '/:id/nft-blockchain-metadata',
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      const { id } = req.params;

      console.log('got request to give nft stats for userID: ', userId);

      if (typeof userId !== 'string' || !userId) {
        return res.status(400).json({
          status: false,
          message: 'userId is required!',
        });
      }

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          walletNftItems: {
            where: {
              nftId: id,
            },
            select: {
              id: true,
              off_chain_metadata: true,
            },
          },
        },
      });

      res.json({
        status: true,
        nfts: user?.walletNftItems || [],
      });
    } catch (err: any) {
      return res.status(500).json({
        status: false,
        message: err?.message || 'Something went wrong',
      });
    }
  }
);

router.get('/', async (req: Request, res: Response) => {
  console.log(req.query);
  try {
    const {
      limit = 100,
      q,
      projectIds,
      mintDate,
      chain = 'solana',
    } = req.query;

    const select = {
      id: true,
      name: true,
      slug: true,
      supply: true,
      mintDate: true,
      price: true,
      project_image_link: true,
      nft_description: true,
      discord_url: true,
      twitter_url: true,
      project_site_link: true,
    };

    if (projectIds?.length) {
      const nfts = await prisma.nFT.findMany({
        where: {
          id: {
            in: projectIds as string[],
          },
        },
        select,
      });

      return res.json({
        status: true,
        nfts,
      });
    }

    if (mintDate) {
      const date = new Date(mintDate as string);
      if (date instanceof Date && isNaN(date.getTime())) {
        throw new Error('Invalid date string');
      }

      date.setHours(0, 0, 0, 0);
      const specificDate = date.toISOString().slice(0, 10);
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      const query: Prisma.NFTFindManyArgs = {
        where: {
          mintDate: {
            gte: new Date(specificDate),
            lt: new Date(nextDate),
          },
        },
        select,
      };

      const nfts = await prisma.nFT.findMany(query);

      return res.json({
        status: true,
        nfts,
      });
    }

    const index = searchClient.index('nft');
    const { hits: nfts } = await index.search(String(q ?? ''), {
      filter: [`mintDate <= ${Date.now()}`, `blockchain.slug = "${chain}"`],
      limit: +limit,
    });

    return res.json({
      status: true,
      nfts,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err?.message || 'Something went wrong',
    });
  }
});

export default router;
