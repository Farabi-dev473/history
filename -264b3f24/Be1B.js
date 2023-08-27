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
  },
  "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu": {
    identifier: "HADESWAP",
    actions: {
      List: {
        // https://explorer.solana.com/tx/2tmbRMabgJrfy9JGvfB2N3Bv3mBRnof9XSCGwu9vsFHK5JxQpMjdmG7TDpkxwoHs32LiYgo4CyruS3V2JzmDuyJu
        // "Instruction: List item"
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["proof", ["u8", 32]],
          ["buyerPrice", "u64"],
        ],
      },
      Sale: {
        // https://explorer.solana.com/tx/e2JpGF1RhtzeaBbU6D4mQJYE6ZThkyWCAjakS75kQX85d2jK4WEkqkMHZHrJGmVUx4TibNbu7giYjasyfi9mmFn
        // SALE FOR 46 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["buyerPrice", "u64"],
        ],
      },
    }
  }
};

