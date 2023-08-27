// const { Transaction } = require('@solana/web3.js');

// async function decodeTransaction(transaction) {
//     const decodedTransaction = await Transaction.decode(transaction);
//     console.log(decodedTransaction);
// }

// decodeTransaction()

console.log(JSON.parse("2i8DcvdB8gXhKUqynxqx8SGucQiRv7jTq3EH3XL9eb1M1aP1B3idThKLX2fMcWk64kEGkr5tzZttEaPKqq2wfR47": {
    "blockTime": 1651970441,
    "meta": {
      "err": null,
      "fee": 5000,
      "innerInstructions": [
        {
          "index": 0,
          "instructions": [
            {
              "parsed": {
                "info": {
                  "account": "8mHt8XHrLiuvhsfyoEhBw2R7c6vwWbt3U424eavouSGc",
                  "authority": "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix",
                  "authorityType": "accountOwner",
                  "newAuthority": "8fjZm4BgydL5j4hSwRSE9kaVN2ytyrxes81eWp3Mc9hu"
                },
                "type": "setAuthority"
              },
              "program": "spl-token",
              "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
          ]
        }
      ],
      "logMessages": [
        "Program M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K invoke [1]",
        "Program log: Instruction: CancelSell",
        "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
        "Program log: Instruction: SetAuthority",
        "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1770 of 172436 compute units",
        "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
        "Program M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K consumed 31156 of 200000 compute units",
        "Program M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K success"
      ],
      "postBalances": [
        4433971160,
        2039280,
        0,
        109001769089,
        1,
        1461600,
        100142473680,
        3654000,
        953185920,
        1141440
      ],
      "postTokenBalances": [
        {
          "accountIndex": 1,
          "mint": "2JtJNJHhYszgnVwX6rg6C3xB3nLpYkQ5LDh43C2LesxY",
          "owner": "8fjZm4BgydL5j4hSwRSE9kaVN2ytyrxes81eWp3Mc9hu",
          "uiTokenAmount": {
            "amount": "1",
            "decimals": 0,
            "uiAmount": 1,
            "uiAmountString": "1"
          }
        }
      ],
      "preBalances": [
        4431742000,
        2039280,
        2234160,
        109001769089,
        1,
        1461600,
        100142473680,
        3654000,
        953185920,
        1141440
      ],
      "preTokenBalances": [
        {
          "accountIndex": 1,
          "mint": "2JtJNJHhYszgnVwX6rg6C3xB3nLpYkQ5LDh43C2LesxY",
          "owner": "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix",
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
    "slot": 132937419,
    "transaction": {
      "message": {
        "accountKeys": [
          {
            "pubkey": "8fjZm4BgydL5j4hSwRSE9kaVN2ytyrxes81eWp3Mc9hu",
            "signer": true,
            "source": "transaction",
            "writable": true
          },
          {
            "pubkey": "8mHt8XHrLiuvhsfyoEhBw2R7c6vwWbt3U424eavouSGc",
            "signer": false,
            "source": "transaction",
            "writable": true
          },
          {
            "pubkey": "CUVukRK7JUdsm6RjnbhaJZxSjtLRsUY3q5biPNCEQNQM",
            "signer": false,
            "source": "transaction",
            "writable": true
          },
          {
            "pubkey": "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix",
            "signer": false,
            "source": "transaction",
            "writable": true
          },
          {
            "pubkey": "11111111111111111111111111111111",
            "signer": false,
            "source": "transaction",
            "writable": false
          },
          {
            "pubkey": "2JtJNJHhYszgnVwX6rg6C3xB3nLpYkQ5LDh43C2LesxY",
            "signer": false,
            "source": "transaction",
            "writable": false
          },
          {
            "pubkey": "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
            "signer": false,
            "source": "transaction",
            "writable": false
          },
          {
            "pubkey": "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe",
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
            "pubkey": "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
            "signer": false,
            "source": "transaction",
            "writable": false
          }
        ],
        "addressTableLookups": null,
        "instructions": [
          {
            "accounts": [
              "8fjZm4BgydL5j4hSwRSE9kaVN2ytyrxes81eWp3Mc9hu",
              "11111111111111111111111111111111",
              "8mHt8XHrLiuvhsfyoEhBw2R7c6vwWbt3U424eavouSGc",
              "2JtJNJHhYszgnVwX6rg6C3xB3nLpYkQ5LDh43C2LesxY",
              "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
              "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe",
              "CUVukRK7JUdsm6RjnbhaJZxSjtLRsUY3q5biPNCEQNQM",
              "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix"
            ],
            "data": "ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L",
            "programId": "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"
          }
        ],
        "recentBlockhash": "BdyXd57TM8dk2S84KD3csqxeZG4nTf3DgU5hA25enBTV"
      },
      "signatures": [
        "2i8DcvdB8gXhKUqynxqx8SGucQiRv7jTq3EH3XL9eb1M1aP1B3idThKLX2fMcWk64kEGkr5tzZttEaPKqq2wfR47"
      ]
    }
}))