import { PROGRAM_IDS } from "./constants.js";

export const programs = {
  M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K: {
    identifier: "MAGICEDEN_V2",
    actions: {
      List: {
        // https://explorer.solana.com/tx/4Naeok5oEbhJ6BvuVrC832V6QtBUx7ntnAap9HhnczQSAmeS7qtXZ8dACcEcr1DM9XAenmeS7WATuxhMCLZdmZYZ?cluster=mainnet-qn1
        // Should be listed for 79 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      Sale: {
        // https://explorer.solana.com/tx/3LAKYWLgWLTbBDthspnAfbffkNBKWXFSixAVXAW9rVPYBbhrizBvCtW1GTvSRpmLgc5GKk7atpreP1XZvVEZG1YB
        // Sale for 0.300 SOL
        // "Instruction: ExecuteSale"
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      Delist: {
        // https://explorer.solana.com/tx/2i8DcvdB8gXhKUqynxqx8SGucQiRv7jTq3EH3XL9eb1M1aP1B3idThKLX2fMcWk64kEGkr5tzZttEaPKqq2wfR47
        // Listing should be canceled for 250 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["buyerPrice", "u64"],
        ],
      },
    },
  },
  HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8: {
    identifier: "HyperSpace",
    actions: {
      List: {
        // https://solscan.io/tx/57oSa2aXsNz8TJPkQBZDQfLfJK2mVLukJFCiTyrdTcjQXAgr325KA5GneoripHhYVTm2rXgVAs8gUcdV4tcvuZqY
        // Should be listed for 0.44 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      Sale: {
        // https://solscan.io/tx/4KsMmAdcYMG91SAjV57iueteCXxaiRWtbFMgbh3ryey1esYS1iTkp1F4MK2UV2t2wSSkUp5YeGUnK2DKubyPVmMA
        // Sale for 0.300 SOL
        // "Instruction: ExecuteSale"
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      Delist: {
        // https://solscan.io/tx/2ZsguCHYspz26dBFSQAYSm5dkoQbTH8oADjCssLYTobYmNiKNXH9ptPaMcAkDJToRfZcFu113ZNpkkKN5daSv1RY
        // Cancel price is not provided by hyperspace, need another way
        schemaFields: null,
      },
    },
  },
  hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk: {
    identifier: "AUCTIONHOUSE",
    marketplaceIds: {
      "29xtkHHFLUHXiLoxTzbC7U8kekTwN3mVQSkfXnB1sQ6e": "CoralCube",
      "3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y": "OpenSea",
    },
    actions: {
      // https://explorer.solana.com/tx/4bfq3XrHJ5ik9rCy6bwJPdAFUbxnbKQbZtYAns4yM5xQxqwGbN675yNjBE8qzgpzirPapkkzwoQxUCzJLnbrXM7a
      // Coralcube via Auctionhouse
      // List for 5.690 SOL
      // "Instruction: Sell"
      List: {
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      // https://explorer.solana.com/tx/3cD5X3v5UATZtqQsFjM4Ki8kMBinvDfZeKH6zHp5MuWUmt7TQXgnLXygmefd7hujE43jyhfVXBnWPqRv4H5Ep56f
      // Coralcube via Auctionhouse
      // sale for 0.008 sol
      Sale: {
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      Delist: {
        // https://explorer.solana.com/tx/57uWMXeGY9i1hLeAvh4QzE8X96TaptueV14bE8N32xfW61k7MEBEkNe1wddpKwhtSuf6KZAvAuVJxbgo3THND3Tn
        // Delist for 65 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["buyerPrice", "u64"],
        ],
      },
    },
  },
  CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz: {
    identifier: "SOLANART",
    actions: {
      List: {
        // https://solscan.io/tx/4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR
        // LIST FOR 17 SOL
        schemaFields: [
          ["instructionDiscriminator", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

      Sale: {
        // https://solscan.io/tx/4JoUgKXcnakz92heyVTjer4UwrhtmgUCqVqcCASH1me2ixfdUPzrzLgVJdtMxYBHZGJ7niofBajB9FfoUg16eHZh
        // SALE FOR 17 SOL
        schemaFields: [
          ["instructionDiscriminator", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

      Delist: {
        // https://explorer.solana.com/tx/5iW72NYeUDFmUsRAxYVxReLx9PYRmApf4MNKRSxT5nZBH2dhRqugpJvbb1GyPtXiKtZg4WVY6kfvgFZ6xGBxKia5
        // Delist for 0.97 SOL
        schemaFields: [
          ["instructionDiscriminator", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
    },
  },
  "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN": {
    identifier: "YAWWW",
    actions: {
      List: {
        // https://explorer.solana.com/tx/2tmbRMabgJrfy9JGvfB2N3Bv3mBRnof9XSCGwu9vsFHK5JxQpMjdmG7TDpkxwoHs32LiYgo4CyruS3V2JzmDuyJu
        // "Instruction: List item"
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["tradeStateBump", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

      Sale: {
        // https://explorer.solana.com/tx/55RUvCGt2ASe6xmEQgRgUiyoHTR1tu17rkpsf2VNhhZwMP1WVdG3U89in4LGJKjqaV3v2pdXTY5Pa91PcwN7ZDNH
        // "Instruction: Buy listed item"
        schemaFields: [
          ["instructionDiscriminator", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
      // https://explorer.solana.com/tx/ngKinE5i3d3xpUYUZ1JgcaoKo4DDpSowrFEzPsPPy8o72VEYhhdr19ZNY5VoRiZKcY26oT6HW4WWHvsJtzMzH8c
      // "Instruction: Cancel listing"
      // Cannot find price from solana transaction data

      // https://solscan.io/tx/2uAF57i5E1oLn15MYLDUoi5fGbw8WcwLsgE3QKJX6qc4DpAyft7Aott9NJXBMAzhKUhK61YFLfaxQMcnntUPuceN
      // Instruction: Update listing
      // LIST FOR 40 SOL
      UpdateList: {
        schemaFields: [
          ["instructionDiscriminator", ["u8", 2]],
          ["buyerPrice", "u64"],
        ],
      },

      Delist: {
        schemaFields: null,
      },
    },
  },
  "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc": {
    identifier: 'Mmm',
    actions: {

      List: {
        // https://explorer.solana.com/tx/4xrVoNr6HtT3GoJMT4yGEkrkxgQ9dtd5FRwdTZiErcsLLFhqtxft2iuo92gsB3f1uq4JygVEJLfcwuo67JugKTQq
        // Sale for 0.8932 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "string"],
          ["buyerPrice", "u64"]
        ]
      },

      // Sale: {
      //   // https://explorer.solana.com/tx/4xrVoNr6HtT3GoJMT4yGEkrkxgQ9dtd5FRwdTZiErcsLLFhqtxft2iuo92gsB3f1uq4JygVEJLfcwuo67JugKTQq
      //   // Sale for 0.8932 SOL
      //   schemaFields: [
      //     ["instructionDiscriminator", ["u8", 8]],
      //     ["", "u16"],
      //     ["", "u16"],
      //     ["", "string"],
      //     ["buyerPrice", "u64"],
      //   ],
      // },

      Sale: {
        // https://explorer.solana.com/tx/4xrVoNr6HtT3GoJMT4yGEkrkxgQ9dtd5FRwdTZiErcsLLFhqtxft2iuo92gsB3f1uq4JygVEJLfcwuo67JugKTQq
        // Sale for 0.8932 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u16"],
          ["", "u16"],
          ["", "string"],
          ["buyerPrice", "u64"],
        ],
      },
    }
  },
  "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu": {
    identifier: "HadeSwap",
    actions: {

      List: {
        // https://explorer.solana.com/tx/4uJrRuRnQ4Kyayt6hreCkwymbe8kecRkPz53CLMsJSeh1AQhTY24BGAV7JEK4fzMZGpYf6pDXoyrHzYixXTkTVAD
        // List For 44 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["buyerPrice", "u64"]
        ]
      },
      
      Sale: {
        // https://explorer.solana.com/tx/e2JpGF1RhtzeaBbU6D4mQJYE6ZThkyWCAjakS75kQX85d2jK4WEkqkMHZHrJGmVUx4TibNbu7giYjasyfi9mmFn
        // SALE FOR 46 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["buyerPrice", "u64"],
        ],
      }

    }
  },
  "6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL": {
    identifier: 'AUCTION_HOUSE_CoralCube_V2',
    
    actions: {

      List: {
        // https://explorer.solana.com/tx/5TfkkW6JeFQVNM7i8Ymtk6SyJz57zWSvBTf7ABeRPBh8wp1PpWhD7wU5t76qAqyvBBkLB7VfQTHVyBs98Fn2CshF
        // Should be listed for 0.15 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

      Sale: {
        // https://explorer.solana.com/tx/5QsMUetK6gxDZWqMrNoh62ZM4EoQJr1fdPfDHGkiicH3bDxzVEd7g3SXowv7UY8JWLXY8zoQBpDhJx9bF5UP7BiZ
        // SALE FOR 0.15 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

      Delist: {
        // https://explorer.solana.com/tx/5yc1jcvraz2ikyXzCfxyxykhyqgwLx3xNT7VeVVzmu7UcU1cncJSEnmKaCbhx6vuPNHs4wZ83gXp1ycqAwvtePg4
        // Delist for 4 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["buyerPrice", "u64"],
        ],
      },
    }
  },
  "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN": {
    identifier: "Tenor Swap",
    actions: {
      List: {
        // https://solscan.io/tx/5g4pDLjDggzNKKhPdwc9C1hyjVokbdz18EGPNwGGJXSHvkrSaDFUTnEBu5gWDFQ4eBaVGfDy2RWxjxeMUoy9ma5M
        // Should be listed for 52.99 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

      Sale: {
        // https://explorer.solana.com/tx/5oNaVsvK41L9UfimWnyPrUFqgKM1wtZxNRatXuJhoR9Nyz31UQbsFBV4XZb38PVR7pwUmcEhfLpGgvnBFG93Rokr
        // Sale for 1.7 SOL
        
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
          ["buyerPrice", "u64"],
        ],
      },

    }
  },
  "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7": {
    identifier: "Digital Eyes",
    actions: {
      List: {
        // https://solscan.io/tx/3EvCqzuf8QTiFTYe2nW3MFcCJHY224KHJU9gS6uXQxMdqXXqFAoyCKr6hzsJ8HEVFnBUx7cA8iz3odeim4zQJdeb
        // LIST FOR 1.6 SOL
        schemaFields: [
          ["instructionDiscriminator", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
    },
  },
};



export default {
  [PROGRAM_IDS.MAGICEDEN_V2]: {
    identifier: 'MAGICEDEN_V2',
    actions: {
      List: {
        // https://explorer.solana.com/tx/4Naeok5oEbhJ6BvuVrC832V6QtBUx7ntnAap9HhnczQSAmeS7qtXZ8dACcEcr1DM9XAenmeS7WATuxhMCLZdmZYZ?cluster=mainnet-qn1
        // Should be listed for 79 SOL
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Sale: {
        // https://explorer.solana.com/tx/3LAKYWLgWLTbBDthspnAfbffkNBKWXFSixAVXAW9rVPYBbhrizBvCtW1GTvSRpmLgc5GKk7atpreP1XZvVEZG1YB
        // Sale for 0.300 SOL
        // "Instruction: ExecuteSale"
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        // https://explorer.solana.com/tx/2i8DcvdB8gXhKUqynxqx8SGucQiRv7jTq3EH3XL9eb1M1aP1B3idThKLX2fMcWk64kEGkr5tzZttEaPKqq2wfR47
        // Listing should be canceled for 250 SOL
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },
  [PROGRAM_IDS.HYPERSPACE]: {
    identifier: 'HyperSpace',
    actions: {
      List: {
        // https://solscan.io/tx/57oSa2aXsNz8TJPkQBZDQfLfJK2mVLukJFCiTyrdTcjQXAgr325KA5GneoripHhYVTm2rXgVAs8gUcdV4tcvuZqY
        // Should be listed for 0.44 SOL
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Sale: {
        // https://solscan.io/tx/4KsMmAdcYMG91SAjV57iueteCXxaiRWtbFMgbh3ryey1esYS1iTkp1F4MK2UV2t2wSSkUp5YeGUnK2DKubyPVmMA
        // Sale for 0.300 SOL
        // "Instruction: ExecuteSale"
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        // https://solscan.io/tx/2ZsguCHYspz26dBFSQAYSm5dkoQbTH8oADjCssLYTobYmNiKNXH9ptPaMcAkDJToRfZcFu113ZNpkkKN5daSv1RY
        // Cancel price is not provided by hyperspace, need another way
        schemaFields: null,
      },
    },
  },
  [PROGRAM_IDS.CORALCUBE_AUCTIONHOUSE_2]: {
    identifier: 'CORALCUBE_AUCTIONHOUSE_2',
    actions: {
      // 5QntfdiEVoeho1mUPKSvSH5rgC8FtGzmwG9ewMe4Tup9N8qq6oJTNgG8dmgkSQiTvR53BpuWXMPjikMNUiAyoSeQ
      // Coralcube via new auction house
      // Sale for 37.8 SOL
      Sale: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      // 4aEtAMycNHWyCYkzqhz42XDPny7MCLXRfCXHojXUhJ5vWWcCius6KXe5D3JHtpTCCzijBNWPFVcYHDbfE1eepY9
      // Coralcube new auctionhouse 37.8 SOL
      List: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        // https://explorer.solana.com/tx/4qAtCVd8S4phT1N67GqRrmJNisdD6Emdk1w97iykPn7SSFMfwgqxAqCZF5dCwZPt8nZM3Cv1xzSuG5gLLs6BEXPJ
        // Delist for 53.9 SOL
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },
  [PROGRAM_IDS.AUCTIONHOUSE]: {
    identifier: 'AUCTIONHOUSE',
    marketplaceIds: {
      [PROGRAM_IDS.CORALCUBE]: 'CoralCube',
      [PROGRAM_IDS.OPENSEA]: 'OpenSea',
    },
    actions: {
      // https://explorer.solana.com/tx/4bfq3XrHJ5ik9rCy6bwJPdAFUbxnbKQbZtYAns4yM5xQxqwGbN675yNjBE8qzgpzirPapkkzwoQxUCzJLnbrXM7a
      // Coralcube via Auctionhouse
      // List for 5.690 SOL
      // "Instruction: Sell"
      List: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      // https://explorer.solana.com/tx/3cD5X3v5UATZtqQsFjM4Ki8kMBinvDfZeKH6zHp5MuWUmt7TQXgnLXygmefd7hujE43jyhfVXBnWPqRv4H5Ep56f
      // Coralcube via Auctionhouse
      // sale for 0.008 sol
      Sale: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        // https://explorer.solana.com/tx/57uWMXeGY9i1hLeAvh4QzE8X96TaptueV14bE8N32xfW61k7MEBEkNe1wddpKwhtSuf6KZAvAuVJxbgo3THND3Tn
        // Delist for 65 SOL
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },
  [PROGRAM_IDS.SOLANART]: {
    identifier: 'SOLANART',
    actions: {
      List: {
        // https://solscan.io/tx/4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR
        // LIST FOR 17 SOL
        schemaFields: [
          ['instructionDiscriminator', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },

      Sale: {
        // https://solscan.io/tx/4JoUgKXcnakz92heyVTjer4UwrhtmgUCqVqcCASH1me2ixfdUPzrzLgVJdtMxYBHZGJ7niofBajB9FfoUg16eHZh
        // SALE FOR 17 SOL
        schemaFields: [
          ['instructionDiscriminator', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },

      Delist: {
        // https://explorer.solana.com/tx/5iW72NYeUDFmUsRAxYVxReLx9PYRmApf4MNKRSxT5nZBH2dhRqugpJvbb1GyPtXiKtZg4WVY6kfvgFZ6xGBxKia5
        // Delist for 0.97 SOL
        schemaFields: [
          ['instructionDiscriminator', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },
  [PROGRAM_IDS.YAWWW]: {
    identifier: 'YAWWW',
    actions: {
      List: {
        // https://explorer.solana.com/tx/2tmbRMabgJrfy9JGvfB2N3Bv3mBRnof9XSCGwu9vsFHK5JxQpMjdmG7TDpkxwoHs32LiYgo4CyruS3V2JzmDuyJu
        // "Instruction: List item"
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['tradeStateBump', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },

      Sale: {
        // https://explorer.solana.com/tx/55RUvCGt2ASe6xmEQgRgUiyoHTR1tu17rkpsf2VNhhZwMP1WVdG3U89in4LGJKjqaV3v2pdXTY5Pa91PcwN7ZDNH
        // "Instruction: Buy listed item"
        schemaFields: [
          ['instructionDiscriminator', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      // https://explorer.solana.com/tx/ngKinE5i3d3xpUYUZ1JgcaoKo4DDpSowrFEzPsPPy8o72VEYhhdr19ZNY5VoRiZKcY26oT6HW4WWHvsJtzMzH8c
      // "Instruction: Cancel listing"
      // Cannot find price from solana transaction data

      // https://solscan.io/tx/2uAF57i5E1oLn15MYLDUoi5fGbw8WcwLsgE3QKJX6qc4DpAyft7Aott9NJXBMAzhKUhK61YFLfaxQMcnntUPuceN
      // Instruction: Update listing
      // LIST FOR 40 SOL
      UpdateList: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 2]],
          ['buyerPrice', 'u64'],
        ],
      },

      Delist: {
        schemaFields: null,
      },
    },
  },
  [PROGRAM_IDS.SOLSEA]: {
    identifier: 'SolSea',
    actions: {
      List: {
        // https://solscan.io/tx/cDjoYvAnwgmRaBFza9LWA2ovsEbkEfuBQRyvfF1qrKRYyHh4CWtj2sfPvqHyKB4DJSa3EnkbnhVJjbNYkimAe4a
        // Solsea LIST@0.9
        schemaFields: [
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Sale: {
        // https://solscan.io/tx/3ViZF4rj2mFpKrU5CHDDrutfowssEXc3hN9eozqRUhw5qbGo7dPHfaWpqzTCKSrKJ9NVJGRyfvHvmiwDd1wZnSjy
        //  Solsea SALE@0.35
        schemaFields: [
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        // https://solscan.io/tx/vDP1uw6V4Hb7VrCmp6DyF4M8vtAgecPsDC9i8Huf9LpNJ11pcqtL9vX4sLe27H5kakiFSe3EX4cugxC9U6MY8mb
        // Cancel price is not provided by hyperspace, need another way
        schemaFields: null,
      },
    },
  },
  [PROGRAM_IDS.SOLSEA_2]: {
    identifier: 'SolSea_2',
    actions: {
      List: {
        // Don't have any SolSea-ii tx for List
        schemaFields: [
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Sale: {
        // https://solscan.io/tx/3rko2Dtf9ht6RNF26WJiNCXfq21RnVwn9W295PNXcKY8yELM4EjiyM6yzAJ2Nx6mYEzvuwS4onxsKhG3SZWBzVup
        //  Solsea-ii SALE@0.35
        schemaFields: [
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        // https://solscan.io/tx/5p5FM6xGdL4AwuVZgaSSUMsfjnqbWByoaegW5BGYJXyRtAGGyh7jg3hToRT7fuDGtymcxzkLu316zPKJNvv8QkA9
        schemaFields: null,
      },
    },
  },
  [PROGRAM_IDS.HADESWAP]: {
    identifier: 'Hadeswap',
    actions: {
      Sale: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['buyerPrice', 'u64'],
        ],
      },
      List: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['', 'u8'],
          ['', 'u8'],
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
      Delist: {
        schemaFields: [
          ['instructionDiscriminator', ['u8', 8]],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },
  [PROGRAM_IDS.EXCHANGE_ART]: {
    identifier: 'exchange-art',
    actions: {
      Sale: {},
      List: {
        schemaFields: [
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },
  [PROGRAM_IDS.TENSOR]: {
    identifier: 'tensor',
    actions: {
      Sale: {
        schemaFields: [
          ['', ['u8', 34]],
          ['buyerPrice', 'u64'],
        ],
      },
      List: {
        schemaFields: [
          ['', 'u8'],
          ['buyerPrice', 'u64'],
        ],
      },
    },
  },

  [PROGRAM_IDS.DIGITAL_EYES]: {
    identifier: 'digital-eyes',
    actions: {  
      List: {
        // https://solscan.io/tx/3EvCqzuf8QTiFTYe2nW3MFcCJHY224KHJU9gS6uXQxMdqXXqFAoyCKr6hzsJ8HEVFnBUx7cA8iz3odeim4zQJdeb
        // Should be listed for 1.6 SOL
        schemaFields: [
          ["instructionDiscriminator", "u8"],
          ["buyerPrice", "u64"],
        ],
      },
    }
  },
  [PROGRAM_IDS.MMM]: {
    identifier: 'mmm',
    actions: {
      Sale: {
        // https://explorer.solana.com/tx/4xrVoNr6HtT3GoJMT4yGEkrkxgQ9dtd5FRwdTZiErcsLLFhqtxft2iuo92gsB3f1uq4JygVEJLfcwuo67JugKTQq
        // Sale for 0.8932 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u16"],
          ["", "u16"],
          ["", "string"],
          ["buyerPrice", "u64"],
        ],
      },
    }
  }
};