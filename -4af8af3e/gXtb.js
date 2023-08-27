"A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7": {
    identifier: "Digital Eyes",
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
  }