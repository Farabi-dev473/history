// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { deserializeUnchecked } from 'borsh';
import bs58 from 'bs58';
import programs from './programs.js';
import { PROGRAM_IDS } from './constants.js';
import fs from 'node:fs'
import web3 from '@solana/web3.js'

class Primitive {
  buyerPrice;
  constructor(args) {
    this.buyerPrice = args.buyerPrice;
  }
}

class BaseProgram {
  /**
   *
   * @param {} transaction
   */
  transaction: import('@solana/web3.js').TransactionResponse;

  constructor(transaction: import('@solana/web3.js').TransactionResponse) {
    this.transaction = transaction;
    this.logMessageJson = transaction?.meta?.logMessages;
    this.transactionType = this.#getTransactionType();
    this.programData = this.#getProgramDataFromAccounts();
    this.transactionId = transaction?.transaction?.signatures[0];

    // default data
    this.seller = this.#getSeller();
    this.owner = this.#getOwner();
    this.buyer = transaction?.meta?.innerInstructions?.[0]?.instructions.find(
      (e) => e?.parsed?.info?.source
    )?.parsed?.info?.source;
    this.amount =
      transaction?.meta?.innerInstructions?.[0]?.instructions?.[0]?.parsed?.info
        ?.lamports / 1_000_000_000;
    this.mintAddress = transaction?.meta?.preTokenBalances?.[0]?.mint;
  }

  get parsedData() {
    return {
      slug: this.programData?.slug,
      txType: this.transactionType,
      seller: this.seller,
      owner: this.owner,
      buyer: this.buyer,
      amount: this.amount,
      mintAddress: this.mintAddress,
      txId: this.transactionId,
    };
  }

  #getInitialSearchData() {
    const logMessages = this.logMessageJson?.join('\n');
    const instructions = new Set(
      this.transaction?.meta?.innerInstructions
        ?.map((inner) =>
          inner?.instructions?.map((instruction) =>
            instruction?.parsed?.type?.trim()
          )
        )
        .flat()
    );

    return {
      logMessages,
      instructions,
    };
  }

  #getTransactionType() {
    const { instructions, logMessages } = this.#getInitialSearchData();

    const isMint =
      instructions?.has('initializeMint') ||
      logMessages?.includes('Instruction: MintNft') ||
      logMessages?.includes('Instruction: InitializeMint');
    if (isMint) return 'Mint';

    const isList =
      ((logMessages?.includes('Instruction: Sell') ||
        logMessages?.includes('Program log: Instruction: List item')) &&
        !logMessages?.includes('Program log: Instruction: ExecuteSale')) ||
      logMessages?.includes('Program log: Init instruction') ||
      logMessages?.includes('Program log: Instruction: DepositNftToPair') ||
      logMessages?.includes(
        'Program log: Instruction: SellNftToLiquidityPair'
      ) ||
      logMessages?.includes('Program log: Instruction: TokenList') ||
      logMessages?.includes('Program log: Instruction: DepositNft');

    if (isList) return 'List';

    const isSale =
      (instructions?.has('createAccount') &&
        instructions?.has('transfer') &&
        instructions?.has('closeAccount') &&
        !logMessages?.includes('Instruction: Sell')) ||
      logMessages?.includes('Program log: Instruction: ExecuteSale') ||
      logMessages?.includes('Program log: Buy instruction') ||
      logMessages?.includes('Program log: Instruction: Buy') ||
      logMessages?.includes('Program log: Instruction: BuyNftFromPair');

    if (isSale) return 'Sale';

    const isUpdateList = logMessages?.includes('Instruction: Update listing');
    // NOTE: return this as List before final data returning to the client
    if (isUpdateList) return 'UpdateList';

    const isDelist =
      logMessages?.includes('Instruction: Cancel') ||
      logMessages?.includes('Instruction: CancelSell') ||
      logMessages?.includes('Program log: Sale cancelled by seller') ||
      logMessages?.includes('Program log: Instruction: Cancel listing') ||
      logMessages?.includes('Program log: Delist instruction') ||
      logMessages?.includes('Program log: Instruction: WithdrawNftFromPair');

    if (isDelist) return 'Delist';

    const isTransfer =
      // https://solana.fm/tx/65d5DnRjE9VHd1YHqXjueXE3r2BfKi1cbTfe2bmDrBZrrcVHcL3a6ckRLqZSfS4isAzXZzYXK2YEUxSu7zTuFrrU?cluster=mainnet-qn1
      logMessages?.includes('Instruction: TransferChecked') ||
      logMessages?.includes('Instruction: Transfer');

    if (isTransfer) return 'Transfer';

    const isBurn = logMessages?.includes('Instruction: Burn');

    if (isBurn) return 'Burn';
  }

  #getProgramDataFromAccounts() {
    const accounts = new Set(
      this.transaction?.transaction?.message?.accountKeys?.map((e) => e.pubkey)
    );

    if (accounts.has(PROGRAM_IDS.MAGICEDEN_V2)) {
      return {
        slug: 'MagicEdenV2',
        programId: PROGRAM_IDS.MAGICEDEN_V2,
        programData: programs[PROGRAM_IDS.MAGICEDEN_V2],
      };
    }

    if (accounts.has(PROGRAM_IDS.CORALCUBE)) {
      return {
        slug: 'CoralCube',
        programId: PROGRAM_IDS.AUCTIONHOUSE,
        programData: programs[PROGRAM_IDS.AUCTIONHOUSE],
      };
    }

    if (accounts.has(PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2)) {
      return {
        slug: 'CoralCube',
        programId: PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2,
        programData: programs[PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2],
      };
    }

    if (accounts.has(PROGRAM_IDS.OPENSEA)) {
      return {
        slug: 'OpenSea',
        programId: PROGRAM_IDS.AUCTIONHOUSE,
        programData: programs[PROGRAM_IDS.AUCTIONHOUSE],
      };
    }

    if (accounts.has(PROGRAM_IDS.SOLANART)) {
      return {
        slug: 'Solanart',
        programId: PROGRAM_IDS.SOLANART,
        programData: programs[PROGRAM_IDS.SOLANART],
      };
    }

    if (accounts.has(PROGRAM_IDS.YAWWW)) {
      return {
        slug: 'yawww',
        programId: PROGRAM_IDS.YAWWW,
        programData: programs[PROGRAM_IDS.YAWWW],
      };
    }

    if (accounts.has(PROGRAM_IDS.HYPERSPACE)) {
      return {
        slug: 'HyperSpace',
        programId: PROGRAM_IDS.HYPERSPACE,
        programData: programs[PROGRAM_IDS.HYPERSPACE],
      };
    }

    if (accounts.has(PROGRAM_IDS.SOLSEA)) {
      return {
        slug: 'solsea',
        programId: PROGRAM_IDS.SOLSEA,
        programData: programs[PROGRAM_IDS.SOLSEA],
      };
    }

    if (accounts.has(PROGRAM_IDS.SOLSEA_2)) {
      return {
        slug: 'solsea',
        programId: PROGRAM_IDS.SOLSEA_2,
        programData: programs[PROGRAM_IDS.SOLSEA_2],
      };
    }

    if (accounts.has(PROGRAM_IDS.HADESWAP)) {
      return {
        slug: 'hadeswap',
        programId: PROGRAM_IDS.HADESWAP,
        programData: programs[PROGRAM_IDS.HADESWAP],
      };
    }

    if (accounts.has(PROGRAM_IDS.EXCHANGE_ART)) {
      return {
        slug: 'exchange-art',
        programId: PROGRAM_IDS.EXCHANGE_ART,
        programData: programs[PROGRAM_IDS.EXCHANGE_ART],
      };
    }

    if (accounts.has(PROGRAM_IDS.TENSOR)) {
      return {
        slug: 'tensor',
        programId: PROGRAM_IDS.TENSOR,
        programData: programs[PROGRAM_IDS.TENSOR],
      };
    }
  }

  #getTransactionPrice() {
    const programParser =
      this.programData?.programData?.actions[this.transactionType];

    const txData = this.transaction.transaction.message.instructions
      .filter((e) => e?.accounts?.length && e.data && e.programId)
      .sort((a, b) => {
        const aLength = a?.accounts?.length;
        const bLength = b?.accounts?.length;
        const slug = this.programData?.slug.toLowerCase();
        if (
          slug === 'opensea' ||
          slug === 'coralcube' ||
          slug === 'exchange-art'
        )
          return bLength - aLength;
        return aLength - bLength;
      })[0];

    const txId = this.transaction.transaction.signatures[0].substring(0, 16);
    let buyerPrice = null;

    if (
      this.programData?.slug === 'hadeswap' &&
      this.transactionType === 'List'
    ) {
      buyerPrice =
        this.transaction?.meta?.innerInstructions[0]?.instructions?.reduce(
          (pre, cur) => {
            if (cur?.parsed?.type === 'transfer') {
              return (cur?.parsed?.info?.lamports || 0) + pre;
            }
            return pre;
          },
          0
        ) || 0;
    } else if (
      this.programData?.slug === 'exchange-art' &&
      this.transactionType === 'Sale'
    ) {
      buyerPrice =
        this.transaction?.meta?.innerInstructions[1]?.instructions?.reduce(
          (pre, cur) => {
            if (cur?.parsed?.type === 'transfer') {
              return (cur?.parsed?.info?.lamports || 0) + pre;
            }
            return pre;
          },
          0
        ) || 0;
    } else {
      if (this.mintAddress && programParser?.schemaFields) {
        const schema = new Map([
          [
            Primitive,
            {
              kind: 'struct',
              fields: programParser.schemaFields,
            },
          ],
        ]);

        try {
          buyerPrice = deserializeUnchecked(
            schema,
            Primitive,
            Buffer.from(bs58.decode(txData.data))
          ).buyerPrice.toNumber();
        } catch (e) {
          // console.log(e);
          console.log(txId, this.transactionType, txData);
        }
      }
    }

    return {
      txId,
      slug: this.programData?.slug,
      txType: this.transactionType,
      mintAddress: this.mintAddress,
      data: txData.data,
      price: buyerPrice / 1_000_000_000,
    };
  }

  #getSeller() {
    const lastInstruction = this.transaction?.meta?.innerInstructions
      ?.at(-1)
      ?.instructions?.at(-1);

    return (
      lastInstruction &&
      lastInstruction.program === 'spl-token' &&
      lastInstruction.parsed.type === 'closeAccount' &&
      lastInstruction.parsed.info.destination
    );
  }

  #getOwner() {
    return this.transaction?.meta?.postTokenBalances?.find(
      (account) => account?.uiTokenAmount?.amount === '1'
    )?.owner;
  }

  isProgram(targetSlug) {
    return this.programData?.slug.toLowerCase() === targetSlug.toLowerCase();
  }

  // Handle different type of transaction types
  #handleMint() {
    let instruction;

    const inner = this.transaction.meta.innerInstructions.find((innerIns) =>
      innerIns.instructions.some((ins) => ins.parsed)
    );

    instruction = inner?.instructions.find(
      (ins) => ins?.parsed?.info?.authorityType === 'mintTokens'
    );

    if (!instruction)
      instruction = this.transaction.transaction.message.instructions.find(
        (ins) => ins?.parsed?.type === 'initializeMint'
      );

    if (instruction) {
      this.mintAddress = instruction.parsed.info.mint;
    }
  }

  #handleSale() {
    if (this.isProgram('yawww')) {
      const mostCoinReceiver =
        this.transaction?.meta?.innerInstructions?.[0]?.instructions
          .filter(
            (instruction) =>
              instruction?.parsed?.type === 'transfer' &&
              instruction?.programId === '11111111111111111111111111111111'
          )
          .sort(
            (a, b) =>
              b?.instruction?.parsed?.info?.lamports -
              a?.instruction?.parsed?.info?.lamports
          )?.[0];

      this.seller = mostCoinReceiver?.parsed?.info?.destination;
    }

    // https://solscan.io/tx/md3WkiawtZ37o3SXzbCH4sqX4KYRgob5RsndHKrMaA3RkLb9ngpxzKue2jFWwmUqDsVQJycj5mPUk9336FVfJkw
    // event: sale, amount: 19, seller: BWhQ6EiFUSz3tvh4e4S2BrSLtbvzgdBpPNbza2ra3zc6, buyer: 73NKzhW8RMimaRYZaySeFMWZKiaXU81PMdU8FN6YLdw5
    if (this.isProgram('hyperspace')) {
      const transferRaw =
        this.transaction?.meta?.innerInstructions?.[0]?.instructions?.[0]
          ?.parsed;
      if (transferRaw?.type === 'transfer' && transferRaw?.info?.lamports) {
        this.amount = transferRaw?.info?.lamports / 1_000_000_000;
        this.seller = transferRaw?.info?.destination;
        this.buyer = transferRaw?.info?.source;
        return;
      }
    }

    if (
      this.isProgram('hyperspace') ||
      this.isProgram('coralcube') ||
      this.isProgram('opensea')
    ) {
      this.seller = this.transaction.meta.postTokenBalances.find(
        (account) => account.uiTokenAmount.amount === '0'
      )?.owner;
    }

    if (this.isProgram('hadeswap')) {
      this.seller =
        this.transaction?.transaction.message?.instructions[0]?.accounts[1];
    }

    const amountRaw = this.logMessageJson
      .find((e) => e.includes('"price"'))
      ?.split('log:')
      ?.at(-1);

    if (amountRaw) {
      this.amount = amountRaw && JSON.parse(amountRaw)?.price / 1_000_000_000;
    } else {
      this.amount = this.#getTransactionPrice()?.price;
    }
  }

  #handleList() {
    const amountRaw = this.logMessageJson
      .find((e) => e.includes('"price"'))
      ?.split('log:')
      ?.at(-1);

    if (amountRaw) {
      this.amount = amountRaw && JSON.parse(amountRaw)?.price / 1_000_000_000;
    } else {
      this.amount = this.#getTransactionPrice().price;
    }

    if (
      this.isProgram('solanart') ||
      this.isProgram('yawww') ||
      this.isProgram('exchange-art')
    ) {
      this.seller = this.transaction.meta.postTokenBalances.find(
        (e) => e?.uiTokenAmount?.amount === '0'
      )?.owner;
    }

    if (
      this.isProgram('coralcube') ||
      this.isProgram('opensea') ||
      this.isProgram('hyperspace')
    ) {
      this.seller =
        this.transaction?.meta?.innerInstructions?.[0]?.instructions[0]?.parsed?.info.owner;
    }

    if (!this.seller) {
      this.seller =
        this.transaction?.meta?.innerInstructions?.[0]?.instructions[0]?.parsed?.info.source;
    }

    if (!this.seller) {
      // probably we missed the data from innerInstructions, let's find it from the first account
      this.seller =
        this.transaction?.transaction?.message?.instructions?.[0]?.accounts?.[0];
    }

    this.buyer = null;
  }

  #handleDelist() {
    this.amount = this.#getTransactionPrice()?.price;

    if (!this.seller) {
      this.seller =
        this.transaction?.meta?.innerInstructions?.[0]?.instructions[0]?.parsed
          ?.info?.newAuthority ||
        this.transaction?.meta?.preTokenBalances?.[0]?.owner;
    }

    if (!this.seller && this.isProgram('MagicEdenV2')) {
      this.seller = this.transaction?.transaction?.message?.instructions?.find(
        (instruction) =>
          instruction.programId ===
          'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K'
      )?.accounts?.[0];
    }

    if (!this.seller)
      console.log(['Error seller on delist', this.transactionId]);

    this.buyer = null;
  }

  #handleTransfer() {
    this.seller = this.transaction?.meta?.preTokenBalances?.find(
      (account) => account?.uiTokenAmount?.amount === '1'
    )?.owner;

    this.buyer = this.transaction?.meta?.postTokenBalances?.find(
      (account) => account?.uiTokenAmount?.amount === '1'
    )?.owner;
  }

  #handleTxType() {
    // get different type of transactions
    // handle based on the types
    switch (this.transactionType) {
      case 'Mint':
        this.#handleMint();
        break;
      case 'Sale':
        this.#handleSale();
        break;
      case 'List':
        this.#handleList();
        break;
      case 'Delist':
        this.#handleDelist();
        break;
      case 'Transfer':
        this.#handleTransfer();
    }
  }

  parse() {
    if (
      !this.transaction ||
      this.transaction?.err ||
      this.transaction?.meta?.err
    )
      return null;

    this.#handleTxType();
  }
}

// getProgramId
// matchPrograms
// switch programs
// solanart extends baseprogram
// coralcube extends auctionhouse extends baseprogram
// opensea extends auctionhouse extends baseprogram
// yawww extends baseprogram
// magiceden extends baseprogram
// default baseprogram


// export default BaseProgram;

const getTransactionIds = () => {
  return Object.keys(JSON.parse(fs.readFileSync('./../db.json', 'utf8')));
}

function singleTransactionParser(transaction) {
  try {
    const txClone = JSON.parse(JSON.stringify(transaction));
    const baseProgram = new BaseProgram(txClone);
    baseProgram.parse();
    return baseProgram.parsedData;
  } catch (e) {
    console.log([transaction.transaction.signatures[0], e]);
  }
}

const getTransaction = async (txId: string) => {
  let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));
  return await connection.getParsedTransaction(txId, {maxSupportedTransactionVersion: 0})
}

const main = () => {
  getTransactionIds().forEach(async (txId) => {
      const tx = await getTransaction(txId);
      singleTransactionParser(tx)
  })
}

main();