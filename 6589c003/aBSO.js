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

  "4jGVk1syMuaDYgD7KX8WLmudMqbkWQr4XTTpHQjk9wvw6Tk5KqkjFDGh51yQHEtpU7yaWQQGuoPBtR8nUBYQZGr8": { "blockTime": 1674241960
  , "meta":
    { "err": null
    , "fee": 5000
    , "innerInstructions":
      [ { "index": 0
        , "instructions":
          [ { "parsed":
              { "info":
                { "account": "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
                , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
                , "source": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
                , "systemProgram": "11111111111111111111111111111111"
                , "tokenProgram": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                , "wallet": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
                }
              , "type": "create"
              }
            , "program": "spl-associated-token-account"
            , "programId": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
            }
          , { "parsed":
              { "info":
                { "extensionTypes":
                  [ "immutableOwner"
                  ]
                , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
                }
              , "type": "getAccountDataSize"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          , { "parsed":
              { "info":
                { "lamports": 2039280
                , "newAccount": "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
                , "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                , "source": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
                , "space": 165
                }
              , "type": "createAccount"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "account": "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
                }
              , "type": "initializeImmutableOwner"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          , { "parsed":
              { "info":
                { "account": "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
                , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
                , "owner": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
                }
              , "type": "initializeAccount3"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          , { "parsed":
              { "info":
                { "destination": "EuCpcygKBc39MY4iNkGUXE161houE4GYt6v1nGJC1GVQ"
                , "lamports": 8296296
                , "source": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
                }
              , "type": "transfer"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "destination": "ATGQVb7VqtEnPSihQ886x1VrNZTv8JaK5ocs9F4dUgZi"
                , "lamports": 8288000000
                , "source": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
                }
              , "type": "transfer"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "amount": "1"
                , "authority": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
                , "destination": "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
                , "source": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
                }
              , "type": "transfer"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          , { "parsed":
              { "info":
                { "account": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
                , "destination": "Dmn9y4VtVoN2KK7NAWS7oJKUT6gsMzNv3qUoYZybBUzY"
                , "owner": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
                }
              , "type": "closeAccount"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          ]
        }
      ]
    , "logMessages":
      [ "Program TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN invoke [1]"
      , "Program log: Instruction: BuyNft"
      , "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [2]"
      , "Program log: Create"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]"
      , "Program log: Instruction: GetAccountDataSize"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 173871 compute units"
      , "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA="
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program 11111111111111111111111111111111 invoke [3]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: Initialize the associated token account"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]"
      , "Program log: Instruction: InitializeImmutableOwner"
      , "Program log: Please upgrade to SPL Token 2022 for immutable owner support"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 167381 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]"
      , "Program log: Instruction: InitializeAccount3"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 163499 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20293 of 179268 compute units"
      , "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success"
      , "Program data: YtB4PF0gE7Rob3/uAQAAAGiXfgAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: Transfer"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 110962 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: CloseAccount"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3015 of 103483 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN consumed 103941 of 200000 compute units"
      , "Program TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN success"
      ]
    , "postBalances":
      [ 157599320720
      , 2039280
      , 0
      , 0
      , 2930160
      , 19881379910
      , 550295838082
      , 42735894682
      , 98315646013
      , 0
      , 1
      , 347998443
      , 1461600
      , 731913600
      , 2547360
      , 5616720
      , 1009200
      , 934087680
      , 1141440
      ]
    , "postTokenBalances":
      [ { "accountIndex": 1
        , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
        , "owner": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "uiTokenAmount":
          { "amount": "1"
          , "decimals": 0
          , "uiAmount": 1
          , "uiAmountString": "1"
          }
        }
      ]
    , "preBalances":
      [ 165897661296
      , 0
      , 1621680
      , 0
      , 2930160
      , 11593379910
      , 550292177122
      , 42735894682
      , 98307349717
      , 2039280
      , 1
      , 347998443
      , 1461600
      , 731913600
      , 2547360
      , 5616720
      , 1009200
      , 934087680
      , 1141440
      ]
    , "preTokenBalances":
      [ { "accountIndex": 9
        , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
        , "owner": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "uiTokenAmount":
          { "amount": "1"
          , "decimals": 0
          , "uiAmount": 1
          , "uiAmountString": "1"
          }
        }
      ]
    , "rewards": []
    , "status":
      { "Ok": null
      }
    }
  , "slot": 173514514
  , "transaction":
    { "message":
      { "accountKeys":
        [ { "pubkey": "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
          , "signer": true
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "5PLfE4dPrgS3P2tQEQxHxUzu9E5VfCxBTTh9tifhgRbz"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "6gWkABmdSeZsmcUXdRJDrgxAK95JeFHoo2XbcGCcdzm9"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "94LZAfWxzMUifgUHVepC3dpxwaghKLH4AugWEEHL3g3A"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "ATGQVb7VqtEnPSihQ886x1VrNZTv8JaK5ocs9F4dUgZi"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "Dmn9y4VtVoN2KK7NAWS7oJKUT6gsMzNv3qUoYZybBUzY"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "EKx4b376L4XkzKY7eTQ2SzXBwH4NKuHHjKbCpckJQyTZ"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "EuCpcygKBc39MY4iNkGUXE161houE4GYt6v1nGJC1GVQ"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "11111111111111111111111111111111"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "CNYjBrhrgtGorxQPj6oCxa9YVxK2Pfre9wBDEtSgWq44"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "HY1t7UAb6rp2Q3H6Qq5bwZC8wfvSW1nm3Ea2nm5FRM4g"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "SysvarRent111111111111111111111111111111111"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        ]
      , "addressTableLookups": null
      , "instructions":
        [ { "accounts":
            [ "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
            , "EuCpcygKBc39MY4iNkGUXE161houE4GYt6v1nGJC1GVQ"
            , "94LZAfWxzMUifgUHVepC3dpxwaghKLH4AugWEEHL3g3A"
            , "CNYjBrhrgtGorxQPj6oCxa9YVxK2Pfre9wBDEtSgWq44"
            , "3jThEtKYhiC6Wknu4dUUXJtXDdV7EJgDL7vLEhhSXBBG"
            , "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
            , "HY1t7UAb6rp2Q3H6Qq5bwZC8wfvSW1nm3Ea2nm5FRM4g"
            , "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
            , "5PLfE4dPrgS3P2tQEQxHxUzu9E5VfCxBTTh9tifhgRbz"
            , "ATGQVb7VqtEnPSihQ886x1VrNZTv8JaK5ocs9F4dUgZi"
            , "Dmn9y4VtVoN2KK7NAWS7oJKUT6gsMzNv3qUoYZybBUzY"
            , "7pYxSDRV6qwSSHAxxJ3MtGUycEenz85rSdmnQTJD73wY"
            , "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            , "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
            , "11111111111111111111111111111111"
            , "SysvarRent111111111111111111111111111111111"
            , "6gWkABmdSeZsmcUXdRJDrgxAK95JeFHoo2XbcGCcdzm9"
            , "EKx4b376L4XkzKY7eTQ2SzXBwH4NKuHHjKbCpckJQyTZ"
            ]
          , "data": "FCfkYhBhxtDmWztkk888tJz7DguWcC4AzVKvRyagCsPL4QR8T3zF"
          , "programId": "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN"
          }
        ]
      , "recentBlockhash": "3uU8dVU6XRSYfHCcwU1UqaqmP7KkCZhPzV6VXKC75QZC"
      }
    , "signatures":
      [ "4jGVk1syMuaDYgD7KX8WLmudMqbkWQr4XTTpHQjk9wvw6Tk5KqkjFDGh51yQHEtpU7yaWQQGuoPBtR8nUBYQZGr8"
      ]
    }
  , "version": "legacy"
  },
  "36UNyxF72UTH2mnsx9sSnainx4JEbTr8PnZuWGGqGxFWXQA1k42hr7NWNRzSXHs9bZShCEULME6yFZR5BpZQZrXi": { "blockTime": 1673504515
  , "meta":
    { "err": null
    , "fee": 5000
    , "innerInstructions":
      [ { "index": 0
        , "instructions":
          [ { "parsed":
              { "info":
                { "lamports": 2039280
                , "newAccount": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
                , "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                , "source": "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
                , "space": 165
                }
              , "type": "createAccount"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "account": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
                , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
                , "owner": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
                , "rentSysvar": "SysvarRent111111111111111111111111111111111"
                }
              , "type": "initializeAccount"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          , { "parsed":
              { "info":
                { "lamports": 1621680
                , "newAccount": "5PLfE4dPrgS3P2tQEQxHxUzu9E5VfCxBTTh9tifhgRbz"
                , "owner": "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN"
                , "source": "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
                , "space": 105
                }
              , "type": "createAccount"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "amount": "1"
                , "authority": "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
                , "destination": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
                , "source": "BXKSwsrvMhKiLvsuKRo1uGiUsC3EnY4YU6AwU3Uf4yFn"
                }
              , "type": "transfer"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          ]
        }
      ]
    , "logMessages":
      [ "Program TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN invoke [1]"
      , "Program log: Instruction: SellNftTradePool"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: InitializeAccount"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4528 of 160442 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program data: YtB4PF0gE7QASdlxAgAAAKA3oAAAAAAAQN1KHwAAAACg9KEFAAAAAA=="
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: Transfer"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 126209 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN consumed 87287 of 200000 compute units"
      , "Program TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN success"
      ]
    , "postBalances":
      [ 37647394961
      , 1621680
      , 0
      , 2930160
      , 26037923123
      , 2039280
      , 645664678002
      , 896465909
      , 96521342554
      , 2039280
      , 1
      , 347998443
      , 1461600
      , 1635600
      , 7189680
      , 5616720
      , 1009200
      , 934087680
      , 1141440
      ]
    , "postTokenBalances":
      [ { "accountIndex": 5
        , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
        , "owner": "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "uiTokenAmount":
          { "amount": "0"
          , "decimals": 0
          , "uiAmount": null
          , "uiAmountString": "0"
          }
        }
      , { "accountIndex": 9
        , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
        , "owner": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "uiTokenAmount":
          { "amount": "1"
          , "decimals": 0
          , "uiAmount": 1
          , "uiAmountString": "1"
          }
        }
      ]
    , "preBalances":
      [ 27781060921
      , 0
      , 0
      , 2930160
      , 36012923123
      , 2039280
      , 645664678002
      , 801965909
      , 96510842554
      , 0
      , 1
      , 347998443
      , 1461600
      , 1635600
      , 7189680
      , 5616720
      , 1009200
      , 934087680
      , 1141440
      ]
    , "preTokenBalances":
      [ { "accountIndex": 5
        , "mint": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
        , "owner": "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "uiTokenAmount":
          { "amount": "1"
          , "decimals": 0
          , "uiAmount": 1
          , "uiAmountString": "1"
          }
        }
      ]
    , "rewards": []
    , "status":
      { "Ok": null
      }
    }
  , "slot": 172059204
  , "transaction":
    { "message":
      { "accountKeys":
        [ { "pubkey": "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
          , "signer": true
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "5PLfE4dPrgS3P2tQEQxHxUzu9E5VfCxBTTh9tifhgRbz"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "6gWkABmdSeZsmcUXdRJDrgxAK95JeFHoo2XbcGCcdzm9"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "94LZAfWxzMUifgUHVepC3dpxwaghKLH4AugWEEHL3g3A"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "ATGQVb7VqtEnPSihQ886x1VrNZTv8JaK5ocs9F4dUgZi"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "BXKSwsrvMhKiLvsuKRo1uGiUsC3EnY4YU6AwU3Uf4yFn"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "Dmn9y4VtVoN2KK7NAWS7oJKUT6gsMzNv3qUoYZybBUzY"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "EKx4b376L4XkzKY7eTQ2SzXBwH4NKuHHjKbCpckJQyTZ"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "EuCpcygKBc39MY4iNkGUXE161houE4GYt6v1nGJC1GVQ"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "11111111111111111111111111111111"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "CNYjBrhrgtGorxQPj6oCxa9YVxK2Pfre9wBDEtSgWq44"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "H64XQ4wGG3JHdsG24uXC1iuDzYxe8TsG687Eqj5wk3YY"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "HY1t7UAb6rp2Q3H6Qq5bwZC8wfvSW1nm3Ea2nm5FRM4g"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "SysvarRent111111111111111111111111111111111"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        ]
      , "addressTableLookups": null
      , "instructions":
        [ { "accounts":
            [ "4zdNGgAtFsW1cQgHqkiWyRsxaAgxrSRRynnuunxzjxue"
            , "EuCpcygKBc39MY4iNkGUXE161houE4GYt6v1nGJC1GVQ"
            , "94LZAfWxzMUifgUHVepC3dpxwaghKLH4AugWEEHL3g3A"
            , "CNYjBrhrgtGorxQPj6oCxa9YVxK2Pfre9wBDEtSgWq44"
            , "H64XQ4wGG3JHdsG24uXC1iuDzYxe8TsG687Eqj5wk3YY"
            , "BXKSwsrvMhKiLvsuKRo1uGiUsC3EnY4YU6AwU3Uf4yFn"
            , "6vBjToJ25iEYHw3mQMnipzRwZwuM5aZTLSeC6mqkRusU"
            , "HY1t7UAb6rp2Q3H6Qq5bwZC8wfvSW1nm3Ea2nm5FRM4g"
            , "ATGQVb7VqtEnPSihQ886x1VrNZTv8JaK5ocs9F4dUgZi"
            , "Dmn9y4VtVoN2KK7NAWS7oJKUT6gsMzNv3qUoYZybBUzY"
            , "HeCZbdTTBpNH8G94FxVMDz6wJWzRKWg3Q6gYqPsrRhgt"
            , "GVcBzh8AmCY2Wcn4V3ykjRWzqLN8DJ5fzhtpno6vFGnj"
            , "5PLfE4dPrgS3P2tQEQxHxUzu9E5VfCxBTTh9tifhgRbz"
            , "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            , "11111111111111111111111111111111"
            , "SysvarRent111111111111111111111111111111111"
            , "6gWkABmdSeZsmcUXdRJDrgxAK95JeFHoo2XbcGCcdzm9"
            , "EKx4b376L4XkzKY7eTQ2SzXBwH4NKuHHjKbCpckJQyTZ"
            ]
          , "data": "3C7t39PnojQYiCoQnkHayH1bZYWa9qoj29RBqmaWNPW6ubXjazL5Spj3zo"
          , "programId": "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN"
          }
        ]
      , "recentBlockhash": "C36n81GrP3YbXmKHk8N7n9J74pRYc95j863EgAaQbbzS"
      }
    , "signatures":
      [ "36UNyxF72UTH2mnsx9sSnainx4JEbTr8PnZuWGGqGxFWXQA1k42hr7NWNRzSXHs9bZShCEULME6yFZR5BpZQZrXi"
      ]
    }
  , "version": "legacy"
  }