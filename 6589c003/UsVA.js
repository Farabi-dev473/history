"TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN": {
    identifier: "Tensor Swap",
    actions: {
      List: {
        // https://explorer.solana.com/tx/4Naeok5oEbhJ6BvuVrC832V6QtBUx7ntnAap9HhnczQSAmeS7qtXZ8dACcEcr1DM9XAenmeS7WATuxhMCLZdmZYZ?cluster=mainnet-qn1
        // Should be listed for 79 SOL
        schemaFields: [
          ["instructionDiscriminator", ["u8", 8]],
          ["", "u8"],
          ["", "u8"],
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
    },
  },