import getProgramDataFromAccounts from "../decoders/getProgramDataFromAccounts.js";

const getInstructionData = (tx, txType) => {
    const programData = getProgramDataFromAccounts(tx);
    const programParser = programData?.programData?.actions[txType];
    
    let txData = {}

    if (programParser?.schemaFields) {
      txData = tx.transaction.message.instructions
        .filter((e) => e?.accounts?.length && e.data && e.programId)
        .sort((a, b) => {
          let aLength = a?.accounts?.length;
          let bLength = b?.accounts?.length;
          const slug = programData.slug.toLowerCase();
          if (slug === "yawww" || slug === "opensea" || slug === "coralcube" || slug === "auction_house_coralcube_v2")
            return bLength - aLength;
          return aLength - bLength;
        })[0];
    }
    
    return txData
}
const tx = {
  "blockTime": 1676865166,
  "meta": {
    "err": null,
    "fee": 10000,
    "innerInstructions": [
      {
        "index": 0,
        "instructions": [
          {
            "parsed": {
              "info": {
                "account": "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV",
                "mint": "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt",
                "source": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
                "systemProgram": "11111111111111111111111111111111",
                "tokenProgram": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                "wallet": "FTJtZgmSfjXH2vRsYbBecb1VcEPufZLNtjWBgP8vaw3e"
              },
              "type": "create"
            },
            "program": "spl-associated-token-account",
            "programId": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "parsed": {
              "info": {
                "extensionTypes": [
                  "immutableOwner"
                ],
                "mint": "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt"
              },
              "type": "getAccountDataSize"
            },
            "program": "spl-token",
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "parsed": {
              "info": {
                "lamports": 2039280,
                "newAccount": "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV",
                "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                "source": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
                "space": 165
              },
              "type": "createAccount"
            },
            "program": "system",
            "programId": "11111111111111111111111111111111"
          },
          {
            "parsed": {
              "info": {
                "account": "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV"
              },
              "type": "initializeImmutableOwner"
            },
            "program": "spl-token",
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "parsed": {
              "info": {
                "account": "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV",
                "mint": "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt",
                "owner": "FTJtZgmSfjXH2vRsYbBecb1VcEPufZLNtjWBgP8vaw3e"
              },
              "type": "initializeAccount3"
            },
            "program": "spl-token",
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "parsed": {
              "info": {
                "lamports": 3285120,
                "newAccount": "51avzgfzv174P43rND4y5J5fuztz1mXcZkeTsv6wtWrL",
                "owner": "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc",
                "source": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
                "space": 344
              },
              "type": "createAccount"
            },
            "program": "system",
            "programId": "11111111111111111111111111111111"
          },
          {
            "parsed": {
              "info": {
                "amount": "1",
                "authority": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
                "destination": "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV",
                "source": "snMGEzAcgJoDoTAne7Q4r32pYKvPxiCigpoaoPCMTa8"
              },
              "type": "transfer"
            },
            "program": "spl-token",
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "parsed": {
              "info": {
                "account": "snMGEzAcgJoDoTAne7Q4r32pYKvPxiCigpoaoPCMTa8",
                "destination": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
                "owner": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv"
              },
              "type": "closeAccount"
            },
            "program": "spl-token",
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ]
      }
    ],
    "logMessages": [
      "Program mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc invoke [1]",
      "Program log: Instruction: DepositSell",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [2]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 168770 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 162280 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 158396 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20394 of 174245 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 99279 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: CloseAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2916 of 90796 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: post_deposit_sell",
      "Program data: gPxxRQMAAAAByAAAAAAAAAABAQAAAAAAAAAAlgBfga0V7NnrsKhwSyq65rEoaVndX87M50tmn5APXJIJ1AAAAAAMo1x6AgyvQZHJuFE2xc+ipjnPDvrwO+Njuukvj75l1gIAAAAAAAAAAAAAAAAAAABSvlNcXWZdMtWE9n5t+zIKZ0klHI/coQZJw0UOlWbL/1+BrRXs2euwqHBLKrrmsShpWd1fzsznS2afkA9ckgnUYTab7xBzaINeHPIMhsHVwqXs9L4auSmWxQAzyBmVHf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMo1x6AgyvQZHJuFE2xc+ipjnPDvrwO+Njuukvj75l1gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGpxZZ8JAAAA",
      "Program mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc consumed 121560 of 200000 compute units",
      "Program mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc success"
    ],
    "postBalances": [4137842399,7324447790711,6799920,0,2039280,3285120,1141440,5616720,2853600,1461600,1,934087680,731913600,1009200],
    "postTokenBalances": [
      {
        "accountIndex": 4,
        "mint": "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt",
        "owner": "FTJtZgmSfjXH2vRsYbBecb1VcEPufZLNtjWBgP8vaw3e",
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "uiTokenAmount": {
          "amount": "1",
          "decimals": 0,
          "uiAmount": 1,
          "uiAmountString": "1"
        }
      }
    ],
    "preBalances": [4141137519,7324447790711,6799920,2039280,0,0,1141440,5616720,2853600,1461600,1,934087680,731913600,1009200],
    "preTokenBalances": [
      {
        "accountIndex": 3,
        "mint": "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt",
        "owner": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "uiTokenAmount": {
          "amount": "1",
          "decimals": 0,
          "uiAmount": 1,
          "uiAmountString": "1"
        }
      }
    ],
    "rewards": [],
    "status": {
      "Ok": null
    }
  },
  "slot": 178674646,
  "transaction": {
    "message": {
      "accountKeys": [
        {
          "pubkey": "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
          "signer": true,
          "source": "transaction",
          "writable": true
        },
        {
          "pubkey": "7RpRDUZBdu5hfmqWvobPazbNeVCagRk5E3Rb8Bm8qRmD",
          "signer": true,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "FTJtZgmSfjXH2vRsYbBecb1VcEPufZLNtjWBgP8vaw3e",
          "signer": false,
          "source": "transaction",
          "writable": true
        },
        {
          "pubkey": "snMGEzAcgJoDoTAne7Q4r32pYKvPxiCigpoaoPCMTa8",
          "signer": false,
          "source": "transaction",
          "writable": true
        },
        {
          "pubkey": "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV",
          "signer": false,
          "source": "transaction",
          "writable": true
        },
        {
          "pubkey": "51avzgfzv174P43rND4y5J5fuztz1mXcZkeTsv6wtWrL",
          "signer": false,
          "source": "transaction",
          "writable": true
        },
        {
          "pubkey": "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "5jJeBhue6p2K5N3Z3KbvKxbnX8iKeegdSZyXs4MLrqjq",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "6pE1shz2nv81xwQmndvoxCdhyhwKVTFfkVDVPUYnFqQk",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "11111111111111111111111111111111",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          "signer": false,
          "source": "transaction",
          "writable": false
        },
        {
          "pubkey": "SysvarRent111111111111111111111111111111111",
          "signer": false,
          "source": "transaction",
          "writable": false
        }
      ],
      "addressTableLookups": null,
      "instructions": [
        {
          "accounts": [
            "6ZzkrkDDxnezvek5ZWHAd24AnLPdqoznUKxQthT72Lgv",
            "7RpRDUZBdu5hfmqWvobPazbNeVCagRk5E3Rb8Bm8qRmD",
            "FTJtZgmSfjXH2vRsYbBecb1VcEPufZLNtjWBgP8vaw3e",
            "5jJeBhue6p2K5N3Z3KbvKxbnX8iKeegdSZyXs4MLrqjq",
            "6pE1shz2nv81xwQmndvoxCdhyhwKVTFfkVDVPUYnFqQk",
            "422aNdE5TXi8oHSVtgT7E6N2mFcxo3BMexsbZCC8mgRt",
            "snMGEzAcgJoDoTAne7Q4r32pYKvPxiCigpoaoPCMTa8",
            "4o6kwmfUYY6k2FJQfx3PLvSKPxwTAii5fNhrdPtkyLcV",
            "51avzgfzv174P43rND4y5J5fuztz1mXcZkeTsv6wtWrL",
            "11111111111111111111111111111111",
            "11111111111111111111111111111111",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            "SysvarRent111111111111111111111111111111111"
          ],
          "data": "2MmKffLd1efLqkuYf7SXfDLK",
          "programId": "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc"
        }
      ],
      "recentBlockhash": "8J2XW2XHGcofXPCaLxMYyz5jLBTeyjCsHpZGanb4mGWP"
    },
    "signatures": [
      "2kA97ZirTGPSFeufpXt9FUsCT3YLpxiTLSWXADohj7jkRoVfW8rzDLywnEY2jCar5AjoUFey4fHNNkshVe6Njqqd",
      "2NoR7HqP4U6Eg5f3Mk8PuYSvSM6Q7GbiqJw14dxHuxXwTqPPyhGVv2tP3EeeSgmTRguNPzi15SkSfSUMsK23eDFb"
    ]
  }
}
const txType = "List"
console.log(getInstructionData(tx, txType)?.data)

export default getInstructionData