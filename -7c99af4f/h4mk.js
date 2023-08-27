"4eSM1jKQoPh1CjHDaDjAEB2HzDN5r4CXe4wMFU5NMcFSEjMsLcJxw7nbqcmdZjqwCxGgBE7FULFNMcHSzbiUmpw3": { "blockTime": 1630358574
, "meta":
  { "err": null
  , "fee": 15000
  , "innerInstructions":
    [ { "index": 4
      , "instructions":
        [ { "parsed":
            { "info":
              { "destination": "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
              , "lamports": 10000000
              , "source": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
              }
            , "type": "transfer"
            }
          , "program": "system"
          , "programId": "11111111111111111111111111111111"
          }
        , { "parsed":
            { "info":
              { "account": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
              , "authorityType": "accountOwner"
              , "multisigAuthority": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
              , "newAuthority": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
              , "signers":
                [ "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
                ]
              }
            , "type": "setAuthority"
            }
          , "program": "spl-token"
          , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ]
      }
    ]
  , "logMessages":
    [ "Program 11111111111111111111111111111111 invoke [1]"
    , "Program 11111111111111111111111111111111 success"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]"
    , "Program log: Instruction: InitializeAccount"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3377 of 200000 compute units"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]"
    , "Program log: Instruction: Transfer"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3119 of 200000 compute units"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
    , "Program 11111111111111111111111111111111 invoke [1]"
    , "Program 11111111111111111111111111111111 success"
    , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 invoke [1]"
    , "Program log: Instruction: InitEscrow"
    , "Program log: sales tax recipients: passed:3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu / expected:\"3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu\""
    , "Program 11111111111111111111111111111111 invoke [2]"
    , "Program 11111111111111111111111111111111 success"
    , "Program log: Calling the token program to transfer token account ownership..."
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
    , "Program log: Instruction: SetAuthority"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2153 of 152702 compute units"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
    , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 consumed 50225 of 200000 compute units"
    , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 success"
    ]
  , "postBalances":
    [ 17850281213
    , 2039280
    , 1621680
    , 2039280
    , 1670698324441
    , 1461600
    , 1
    , 1
    , 1089991680
    , 1141440
    ]
  , "postTokenBalances":
    [ { "accountIndex": 1
      , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
      , "uiTokenAmount":
        { "amount": "1"
        , "decimals": 0
        , "uiAmount": 1
        , "uiAmountString": "1"
        }
      }
    , { "accountIndex": 3
      , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
      , "uiTokenAmount":
        { "amount": "0"
        , "decimals": 0
        , "uiAmount": null
        , "uiAmountString": "0"
        }
      }
    ]
  , "preBalances":
    [ 17863957173
    , 0
    , 0
    , 2039280
    , 1670688324441
    , 1461600
    , 1
    , 1
    , 1089991680
    , 1141440
    ]
  , "preTokenBalances":
    [ { "accountIndex": 3
      , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
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
, "slot": 94115358
, "transaction":
  { "message":
    { "accountKeys":
      [ { "pubkey": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
        , "signer": true
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
        , "signer": true
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "D2ytRj4re5GTuo8Ab3srShQei2ioJF5UPLG3PqHfx5Gk"
        , "signer": true
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "8uCLmzKx3gBwrpid7uTVCc6wxd7bAbiFBeLhygq3EU97"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "SysvarRent111111111111111111111111111111111"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "11111111111111111111111111111111"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      ]
    , "addressTableLookups": null
    , "instructions":
      [ { "parsed":
          { "info":
            { "lamports": 2039280
            , "newAccount": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
            , "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            , "source": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
            , "space": 165
            }
          , "type": "createAccount"
          }
        , "program": "system"
        , "programId": "11111111111111111111111111111111"
        }
      , { "parsed":
          { "info":
            { "account": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
            , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
            , "owner": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
            , "rentSysvar": "SysvarRent111111111111111111111111111111111"
            }
          , "type": "initializeAccount"
          }
        , "program": "spl-token"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      , { "parsed":
          { "info":
            { "amount": "1"
            , "authority": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
            , "destination": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
            , "source": "8uCLmzKx3gBwrpid7uTVCc6wxd7bAbiFBeLhygq3EU97"
            }
          , "type": "transfer"
          }
        , "program": "spl-token"
        , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      , { "parsed":
          { "info":
            { "lamports": 1621680
            , "newAccount": "D2ytRj4re5GTuo8Ab3srShQei2ioJF5UPLG3PqHfx5Gk"
            , "owner": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
            , "source": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
            , "space": 105
            }
          , "type": "createAccount"
          }
        , "program": "system"
        , "programId": "11111111111111111111111111111111"
        }
      , { "accounts":
          [ "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
          , "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
          , "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
          , "D2ytRj4re5GTuo8Ab3srShQei2ioJF5UPLG3PqHfx5Gk"
          , "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
          , "11111111111111111111111111111111"
          , "SysvarRent111111111111111111111111111111111"
          , "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ]
        , "data": "11AAwrmq8631"
        , "programId": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
        }
      ]
    , "recentBlockhash": "FuT3nvbr44C2rFh146V9X8ausHNAw5HziVChzEzqbioK"
    }
  , "signatures":
    [ "4eSM1jKQoPh1CjHDaDjAEB2HzDN5r4CXe4wMFU5NMcFSEjMsLcJxw7nbqcmdZjqwCxGgBE7FULFNMcHSzbiUmpw3"
    , "3c6QsFjpijzm9WhoSpH4EFASLgTLHFLQtbash9cArvfmhBdZHQPqxdCKcncyXkC67nmvUNHwiFd3fHmSDyowKbrr"
    , "Vsth2yFVzxdrQx9CvrxzAKmkvZjbsDQVmvTLxozkzrPFK1WUZ8NEXjx76W4ovvkvrA2EStGVYAfDP6wij6htAvo"
    ]
  }
, "version": "legacy"
},
"4UyyDuobTgGdNYKLZDNTiatF5gKK2yaidRuPnjRtvNxSCig4TpZ7Q54VPGQEeF6FrRa2TXa3YxfvxoHi7vWD3uAy": { "blockTime": 1630358498
, "meta":
  { "err": null
  , "fee": 5000
  , "innerInstructions":
    [ { "index": 0
      , "instructions":
        [ { "parsed":
            { "info":
              { "amount": "1"
              , "destination": "8uCLmzKx3gBwrpid7uTVCc6wxd7bAbiFBeLhygq3EU97"
              , "multisigAuthority": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
              , "signers":
                [ "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
                ]
              , "source": "DYrXYaptZArhRKina738AZvYrFmaiiPep7PzPymg4M8K"
              }
            , "type": "transfer"
            }
          , "program": "spl-token"
          , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        , { "parsed":
            { "info":
              { "account": "DYrXYaptZArhRKina738AZvYrFmaiiPep7PzPymg4M8K"
              , "destination": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
              , "multisigOwner": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
              , "signers":
                [ "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
                ]
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
    [ "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 invoke [1]"
    , "Program log: Instruction: Exchange"
    , "Program log: sales tax recipients: passed:3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu / expected:\"3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu\""
    , "Program log: Calling the token program to transfer tokens to the taker..."
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
    , "Program log: Instruction: Transfer"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3246 of 145207 compute units"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
    , "Program log: Calling the token program to close pda's temp account..."
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
    , "Program log: Instruction: CloseAccount"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2422 of 138937 compute units"
    , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
    , "Program log: Closing the escrow account..."
    , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 consumed 64711 of 200000 compute units"
    , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 success"
    ]
  , "postBalances":
    [ 17863957173
    , 2039280
    , 0
    , 0
    , 1669796324441
    , 1461600
    , 5616720
    , 197064294492
    , 1089991680
    , 1
    , 0
    , 1141440
    ]
  , "postTokenBalances":
    [ { "accountIndex": 1
      , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
      , "uiTokenAmount":
        { "amount": "1"
        , "decimals": 0
        , "uiAmount": 1
        , "uiAmountString": "1"
        }
      }
    ]
  , "preBalances":
    [ 17860301213
    , 2039280
    , 2039280
    , 1621680
    , 1669796324441
    , 1461600
    , 5616720
    , 197064294492
    , 1089991680
    , 1
    , 0
    , 1141440
    ]
  , "preTokenBalances":
    [ { "accountIndex": 1
      , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
      , "uiTokenAmount":
        { "amount": "0"
        , "decimals": 0
        , "uiAmount": null
        , "uiAmountString": "0"
        }
      }
    , { "accountIndex": 2
      , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
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
, "slot": 94115213
, "transaction":
  { "message":
    { "accountKeys":
      [ { "pubkey": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
        , "signer": true
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "8uCLmzKx3gBwrpid7uTVCc6wxd7bAbiFBeLhygq3EU97"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "DYrXYaptZArhRKina738AZvYrFmaiiPep7PzPymg4M8K"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "6HP14Hkgxjp9fesypY1AtnRNDkHvDeKeHA1RYxLnxGLL"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "43ggGtMvZVTU6BtotrHhCH53vxA6inZhTRDzFUHYJLie"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "AvkbtawpmMSy571f71WsWEn41ATHg5iHw27LoYJdk8QA"
        , "signer": false
        , "source": "transaction"
        , "writable": true
        }
      , { "pubkey": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "11111111111111111111111111111111"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      , { "pubkey": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
        , "signer": false
        , "source": "transaction"
        , "writable": false
        }
      ]
    , "addressTableLookups": null
    , "instructions":
      [ { "accounts":
          [ "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
          , "8uCLmzKx3gBwrpid7uTVCc6wxd7bAbiFBeLhygq3EU97"
          , "DYrXYaptZArhRKina738AZvYrFmaiiPep7PzPymg4M8K"
          , "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
          , "6HP14Hkgxjp9fesypY1AtnRNDkHvDeKeHA1RYxLnxGLL"
          , "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
          , "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
          , "43ggGtMvZVTU6BtotrHhCH53vxA6inZhTRDzFUHYJLie"
          , "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          , "11111111111111111111111111111111"
          , "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
          , "AvkbtawpmMSy571f71WsWEn41ATHg5iHw27LoYJdk8QA"
          ]
        , "data": "jzDsaTSmGkw"
        , "programId": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
        }
      ]
    , "recentBlockhash": "mu6fAkH5Tbf9AYporCZCRjuQE4eCMCAwbiFRcVvcpHA"
    }
  , "signatures":
    [ "4UyyDuobTgGdNYKLZDNTiatF5gKK2yaidRuPnjRtvNxSCig4TpZ7Q54VPGQEeF6FrRa2TXa3YxfvxoHi7vWD3uAy"
    ]
  }
, "version": "legacy"
},
"2Suj2rBwGsZonL462C93dvB6JX7nJUsBUTgHE6JuoCtEtcDFG3Wekb2tdbG7BbMnhByUXRNJLZZE2r7L81Rxyx85": { "blockTime": 1630358998
  , "meta":
    { "err": null
    , "fee": 5000
    , "innerInstructions":
      [ { "index": 0
        , "instructions":
          [ { "parsed":
              { "info":
                { "destination": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
                , "lamports": 2039280
                , "source": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
                }
              , "type": "transfer"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "account": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
                , "space": 165
                }
              , "type": "allocate"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "account": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
                , "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
              , "type": "assign"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "account": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
                , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
                , "owner": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
                , "rentSysvar": "SysvarRent111111111111111111111111111111111"
                }
              , "type": "initializeAccount"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          ]
        }
      , { "index": 1
        , "instructions":
          [ { "parsed":
              { "info":
                { "destination": "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
                , "lamports": 125000000
                , "source": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
                }
              , "type": "transfer"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "destination": "AvkbtawpmMSy571f71WsWEn41ATHg5iHw27LoYJdk8QA"
                , "lamports": 250000000
                , "source": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
                }
              , "type": "transfer"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "destination": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
                , "lamports": 4625000000
                , "source": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
                }
              , "type": "transfer"
              }
            , "program": "system"
            , "programId": "11111111111111111111111111111111"
            }
          , { "parsed":
              { "info":
                { "amount": "1"
                , "destination": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
                , "multisigAuthority": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
                , "signers":
                  [ "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
                  ]
                , "source": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
                }
              , "type": "transfer"
              }
            , "program": "spl-token"
            , "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          , { "parsed":
              { "info":
                { "account": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
                , "destination": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
                , "multisigOwner": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
                , "signers":
                  [ "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
                  ]
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
      [ "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]"
      , "Program log: Transfer 2039280 lamports to the associated token account"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: Allocate space for the associated token account"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: Assign the associated token account to the SPL Token program"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: Initialize the associated token account"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: InitializeAccount"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3380 of 179575 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 24454 of 200000 compute units"
      , "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success"
      , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 invoke [1]"
      , "Program log: Instruction: Exchange"
      , "Program log: sales tax recipients: passed:3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu / expected:\"3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu\""
      , "Program log: Transfering sales tax"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: Checking metadata..."
      , "Program log: valid metadata found"
      , "Program log: seller fee basis points: 500"
      , "Program log: Disbursing royalties..."
      , "Program log: creator 0: AvkbtawpmMSy571f71WsWEn41ATHg5iHw27LoYJdk8QA, share: 100"
      , "Program log: amount: 250000000.0"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: Transfering payment to initializer."
      , "Program log: Final amount: 4625000000"
      , "Program log: lp1: 17836605253 / lp2: 25019644245"
      , "Program 11111111111111111111111111111111 invoke [2]"
      , "Program 11111111111111111111111111111111 success"
      , "Program log: lp1: 22461605253 / lp2: 20394644245"
      , "Program log: Calling the token program to transfer tokens to the taker..."
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: Transfer"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3246 of 115986 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program log: Calling the token program to close pda's temp account..."
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]"
      , "Program log: Instruction: CloseAccount"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2422 of 109716 compute units"
      , "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
      , "Program log: Closing the escrow account..."
      , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 consumed 93964 of 200000 compute units"
      , "Program A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7 success"
      ]
    , "postBalances":
      [ 20394644245
      , 2039280
      , 0
      , 22465266213
      , 0
      , 1699144574416
      , 1461600
      , 5616720
      , 202732794442
      , 1
      , 1089991680
      , 1
      , 0
      , 898174080
      , 1141440
      ]
    , "postTokenBalances":
      [ { "accountIndex": 1
        , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
        , "uiTokenAmount":
          { "amount": "1"
          , "decimals": 0
          , "uiAmount": 1
          , "uiAmountString": "1"
          }
        }
      ]
    , "preBalances":
      [ 25396688525
      , 0
      , 2039280
      , 17836605253
      , 1621680
      , 1699019574416
      , 1461600
      , 5616720
      , 202482794442
      , 1
      , 1089991680
      , 1
      , 0
      , 898174080
      , 1141440
      ]
    , "preTokenBalances":
      [ { "accountIndex": 2
        , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
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
  , "slot": 94116168
  , "transaction":
    { "message":
      { "accountKeys":
        [ { "pubkey": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
          , "signer": true
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "D2ytRj4re5GTuo8Ab3srShQei2ioJF5UPLG3PqHfx5Gk"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "43ggGtMvZVTU6BtotrHhCH53vxA6inZhTRDzFUHYJLie"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "AvkbtawpmMSy571f71WsWEn41ATHg5iHw27LoYJdk8QA"
          , "signer": false
          , "source": "transaction"
          , "writable": true
          }
        , { "pubkey": "11111111111111111111111111111111"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "SysvarRent111111111111111111111111111111111"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        , { "pubkey": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
          , "signer": false
          , "source": "transaction"
          , "writable": false
          }
        ]
      , "addressTableLookups": null
      , "instructions":
        [ { "parsed":
            { "info":
              { "account": "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
              , "mint": "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
              , "source": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
              , "systemProgram": "11111111111111111111111111111111"
              , "tokenProgram": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
              , "wallet": "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
              }
            , "type": "create"
            }
          , "program": "spl-associated-token-account"
          , "programId": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          }
        , { "accounts":
            [ "7caxDmcM4xJE4HTqEEXMLwhPoK7uSFWPyNJEvZaMZfT3"
            , "FtuCpxSS3zTENsxMkb573sqrNz8NDQUncmrNeY5PEZ8R"
            , "9tXzLrv5ewh4kjTZ1AHjUe4ezEjy8p85Hgw9aWy9SVVs"
            , "4vRbsj4kHfPDDTtgndwtdsVKnGScXBZkYUTnNC69n4LS"
            , "D2ytRj4re5GTuo8Ab3srShQei2ioJF5UPLG3PqHfx5Gk"
            , "3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu"
            , "FQfNqWX6LewhXGcrSBuXDEo3sjQELVM9zdr11M5yyu9t"
            , "43ggGtMvZVTU6BtotrHhCH53vxA6inZhTRDzFUHYJLie"
            , "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            , "11111111111111111111111111111111"
            , "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr"
            , "AvkbtawpmMSy571f71WsWEn41ATHg5iHw27LoYJdk8QA"
            ]
          , "data": "jzDsaTSmGkw"
          , "programId": "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"
          }
        ]
      , "recentBlockhash": "23cEcUUTFxnJuHYnse8acdGZDSYfUD3qv56siZUfehkA"
      }
    , "signatures":
      [ "2Suj2rBwGsZonL462C93dvB6JX7nJUsBUTgHE6JuoCtEtcDFG3Wekb2tdbG7BbMnhByUXRNJLZZE2r7L81Rxyx85"
      ]
    }
  , "version": "legacy"
  },