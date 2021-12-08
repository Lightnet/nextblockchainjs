//let hash = require('object-hash')
import SHA256 from 'crypto-js/sha256.js';

export class BlockChain{
  constructor(){
    //create
    this.chain = [];
    //Transactions
    this.curr_transactions = [];
  }

  addNewBlock(prevHash){
    let block = {
      index:this.chain.length+1,
      timestamp: Date.now(),
      transactions:this.curr_transactions,
      //hash:null,
      prevHash, prevHash
    };

    this.hash = SHA256(JSON.stringify(block)).toString();

    //console.log("this.hash")
    //console.log(this.hash)

    //Add to chain
    this.chain.push(block);
    this.curr_transactions = [];
    return block;
  }

  addNewTransaction(sender, recipient, amount){
    this.curr_transactions.push({sender,recipient,amount})
  }

  lastBlock(){
    return this.chain.slice(-1)[0];
  }

  isEmpty(){
    return this.chain.length == 0;
  }

}

//export BlockChain;