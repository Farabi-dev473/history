import MagicEdenParseStrategy from '../src/packages/decoders/List_Event_Parser/magicEdenParseStrategy.js'
import HyperSpaceParseStrategy from '../src/packages/decoders/List_Event_Parser/hyperSpaceParseStrategy.js'
import AuctionHouseParseStrategy from '../src/packages/decoders/List_Event_Parser/auctionHouseParseStrategy.js'
import DigitalEyesParseStrategy from '../src/packages/decoders/List_Event_Parser/digitalEyesParseStrategy.js'
import SolanartParseStrategy from '../src/packages/decoders/List_Event_Parser/solanartParseStrategy.js'
import TenorSwapParseStrategy from '../src/packages/decoders/List_Event_Parser/tenorSwapParseStrategy.js'
import ListEventParser from '../src/packages/decoders/List_Event_Parser/listEventParser.js'

let txId, output, result, listEventParser

describe('ListEventParser', () => {
    
    it("should return an object which is equal to `output` - Magic Eden V2 Program", () => {
        txId = "57bHzn6dNftr7J17JGEbvJsD4RjkZWLQWRohD1b9xqk7nsAX5woh2tozcJLLcFph5GkkuNcgGS7ihcdfhx8bVhbP"
        const magicEdenParseStrategy = new MagicEdenParseStrategy(txId)
        result = new ListEventParser(magicEdenParseStrategy).parse()
        output = {
            pdaAddress: '7FFHkvtcHBLPQubz5QUZ5qkFohaxA3yjyC5LWPFMNYHg',
            auctionHouse: 'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe',
            tokenAddress: '4sq66jVVa5k8YDUUF2j8KSSbUesRy3rzRWUnGXXwABHM',
            tokenMint: '8i1on1c81t9LNwesYyreZfqMB1LYGx21ScvuB1JSYutQ',
            seller: '9DxRBPbEE41o4HZM7j4PV4cvKozmWgdEgdGqtqP7h4zd',
            sellerReferral: 'autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2',
            tokenSize: 1,
            expiry: -1,
            price: 0.566
        }
        expect(result).toEqual(output)
    })

    it('should return an object which is equal to `output` - HyperSpace Program', () => {
        txId = "65GBRLNkRcuSr8JkgFg1xJuMRqWLTXd87uv2bxLvEq1TgY2MdiLtqtEqNRxqaSPuyMASJoaxP4Z9sdFZ67UGHhYF"
        const hyperSpaceParseStrategy = new HyperSpaceParseStrategy(txId)
        result = new ListEventParser(hyperSpaceParseStrategy).parse()
        output = {
            pdaAddress: 'C8dLV8Rxo49Zwc2SnTTn1bHNnVWMi77PM3957pnYpbhp',
            auctionHouse: '4BzVBkBvZ7atwQCw2sVQjXG3EDuouuD7EVgtEgJ9CNWc',
            tokenAddress: '2qbHEBkNcPdBa4baXJND7RS2f4gS99XbZfXrUUtoWTNx',
            tokenMint: 'Ep8W6ou8nphhx83K2XHzFt7nvHWRVXHCKVxrnaPYNh2c',
            seller: '4vnt9boTFKqGEykMUexG3uyr64QnaLetHmFTSPucF57',
            sellerReferral: '6QEJwoTfHg4vkwE6nbprtwiwEw7msvNuZJ1tp22SPACE',
            tokenSize: 1,
            expiry: undefined,
            price: 115
          }

        expect(result).toEqual(output)
    })

    it('should return an object which is equal to `output` - Solanart Program', () => {
        txId = "4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"
        const solanartParseStrategy = new SolanartParseStrategy(txId)
        result = new ListEventParser(solanartParseStrategy).parse()
        output = {
            pdaAddress: '5cKUN1Wre6EHhh2j6knEPwLtfLs4jPkEtcwxL2TjBLdM',
            auctionHouse: '969kj9XHPixNZ1Yet7sMA4zyGhyFsZcfipcc5caU8pfV',
            tokenAddress: '4xRjoLZq9LWo6f9ETEVmeJ3KF5ze7h3VC2vh1YA71R6u',
            tokenMint: 'BhfThdDQjZMkXHPSQGxKrbNoqtj3DhVrtFYAKYBaFRkz',
            seller: 'EAoUTaAQAxTmmpkgXjJoGuc6AN298PCn1cgtmcEnHxqF',
            sellerReferral: '39fEpihLATXPJCQuSiXLUSiCbGchGYjeL39eyXh3KbyT',
            tokenSize: 1,
            expiry: undefined,
            price: 17
          }

        result = parseListEventTx(txId)
        expect(result).toEqual(output)
    })

    it('should return an object which is equal to `output` - Auction House Program', () => {
        txId = "4bfq3XrHJ5ik9rCy6bwJPdAFUbxnbKQbZtYAns4yM5xQxqwGbN675yNjBE8qzgpzirPapkkzwoQxUCzJLnbrXM7a"
        const auctionHouseParseStrategy = new AuctionHouseParseStrategy(txId)
        result = new ListEventParser(auctionHouseParseStrategy).parse()
        output = {
            pdaAddress: '7sCBBDvgc6N4xPbWFVDydBp1cUvQw4EoCNfB3wC8bSsK',
            auctionHouse: '29xtkHHFLUHXiLoxTzbC7U8kekTwN3mVQSkfXnB1sQ6e',
            tokenAddress: '38FWaDDVwfFTXmEzi2C7THNkyeWGBveXE5ZfVQJnx3Jk',
            tokenMint: '2mV6fMySkw6XiP6ghkWNxzFGv9w17ppxmTkB1r1ecxsi',
            seller: 'DGWLm75aiyRC6eYio145cMngn1RzP1DRPc4zuDr2jXb3',
            sellerReferral: '7sCBBDvgc6N4xPbWFVDydBp1cUvQw4EoCNfB3wC8bSsK',
            tokenSize: 1,
            expiry: undefined,
            price: 5.69
          }

        result = parseListEventTx(txId)
        expect(result).toEqual(output)
    })

    it('should return an object which is equal to `output` - Digital Eye Program', () => {
      txId = "3EvCqzuf8QTiFTYe2nW3MFcCJHY224KHJU9gS6uXQxMdqXXqFAoyCKr6hzsJ8HEVFnBUx7cA8iz3odeim4zQJdeb"
      const digitalEyesParseStrategy = new DigitalEyesParseStrategy(txId)
      result = new ListEventParser(digitalEyesParseStrategy).parse()
      output = {
        pdaAddress: '2oeE5hZM5EJRbvMDcBv1Qihn7eSmQXJdnEtgsef2fEiR',
        auctionHouse: undefined,
        tokenAddress: '4unBjdeVbZQ1NydiWtih52LCaCRqM82Qjb88XwTsdgrK',
        tokenMint: 'CtBHo51pp6ZdPoFW2P9b6fLTbiee9pAgDtQeJ8PDRxB1',
        seller: '7cYKDBt5T5cqoUzsG4N34tYwv8fgrNcc6AUzokDkfkT1',
        sellerReferral: '3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu',
        tokenSize: 1,
        expiry: undefined,
        price: 1.6
      }
        
      result = parseListEventTx(txId)
      expect(result).toEqual(output)
  })

//   it('should return an object which is equal to `output` - Tenor Swap Program', () => {
//     txId = "3EvCqzuf8QTiFTYe2nW3MFcCJHY224KHJU9gS6uXQxMdqXXqFAoyCKr6hzsJ8HEVFnBUx7cA8iz3odeim4zQJdeb"
//     const tenorSwapParseStrategy = new TenorSwapParseStrategy(txId)
//     result = new ListEventParser(tenorSwapParseStrategy).parse()
//     output = {
//       pdaAddress: '2oeE5hZM5EJRbvMDcBv1Qihn7eSmQXJdnEtgsef2fEiR',
//       auctionHouse: undefined,
//       tokenAddress: '4unBjdeVbZQ1NydiWtih52LCaCRqM82Qjb88XwTsdgrK',
//       tokenMint: 'CtBHo51pp6ZdPoFW2P9b6fLTbiee9pAgDtQeJ8PDRxB1',
//       seller: '7cYKDBt5T5cqoUzsG4N34tYwv8fgrNcc6AUzokDkfkT1',
//       sellerReferral: '3iYf9hHQPciwgJ1TCjpRUp1A3QW4AfaK7J6vCmETRMuu',
//       tokenSize: 1,
//       expiry: undefined,
//       price: 1.6
//     }
      
//     result = parseListEventTx(txId)
//     expect(result).toEqual(output)
// })
})