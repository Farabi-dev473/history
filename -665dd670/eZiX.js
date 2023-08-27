import MagicEdenParseStrategy from './magicEdenParseStrategy.js'
import HyperSpaceParseStrategy from './hyperSpaceParseStrategy.js'
import AuctionHouseParseStrategy from './auctionHouseParseStrategy.js'
import DigitalEyesParseStrategy from './digitalEyesParseStrategy.js'
import TenorSwapParseStrategy from './tenorSwapParseStrategy.js'
import SolanartParseStrategy from './solanartParseStrategy.js'

class ParseStrategy {
   strategy

   constructor(strategy){
    this.strategy = strategy
   }

   parseListEventTx(){
    return this.strategy.parseListEventTx()
   }
}

const strategy = new MagicEdenParseStrategy("57bHzn6dNftr7J17JGEbvJsD4RjkZWLQWRohD1b9xqk7nsAX5woh2tozcJLLcFph5GkkuNcgGS7ihcdfhx8bVhbP")
console.log()