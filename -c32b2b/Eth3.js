
export default class ListEventParser {
   strategy

   constructor(strategy){
    this.strategy = strategy
   }

   parse(){
    return this.strategy.parseListEventTx()
   }
}
