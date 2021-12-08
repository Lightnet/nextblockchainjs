// https://ozenero.com/how-to-create-blockchain-api-javascript-example
// - express



//https://www.section.io/engineering-education/building-a-simple-cryptocurrency-blockchain/

/*
Block
- _index
- _timestamp
- _transactions
- _proof
- _previous_hash

Blockchain
- _chain = []
- _nodes
- _current_transactions
- new_block(100,1);
- 
- 
Wallet
- publicKey
- privateKey


Transaction
- amount
- payer // public key
- payee // public key

*/

const SHA256 = require('crypto-js/sha256');


let bc;

export default async function instanceblock(){
  if(bc){
    console.log("resued");
    return bc;
  }

  console.log("create");

  bc = new Block();
  return bc;
}


export class Block{

  constructor(index, current_time, info, nextHash=" "){
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();
  }

  computeHash(){
    return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
  }
}

export class BlockCrypto{

  constructor(index, current_time, info, nextHash=" "){
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();
  }

  computeHash(){
    return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
  }
}

export class Blockchain{
  constructor(){
    this.block1chain = [this.initGenesisBlock()];
  }
  initGenesisBlock(){
    return new BlockCrypto(0, "06/04/2021", "Initial Block in the Chain", "0");
  }
  latestBlock(){
    return this.block1chain[this.block1chain.length - 1];
  }
  addNewBlock(newBlock){
    newBlock.nextHash = this.latestBlock().hash;
    newBlock.hash = newBlock.computeHash();        
    this.block1chain.push(newBlock);
  }
  checkValidity(){
    // Checking validity
    for(let i = 1; i < this.block1chain.length; i++) {
      const currentBlock = this.block1chain[i];
      const nextBlock= this.blockchain[i-1];
      // Checking current blcok hash
    }
    
    if(currentBlock.hash !== currentBlock.computeHash()) {
      return false;
    }
    // Comparing current block hash with the next block

    if(currentBlock.nextHash !== nextBlock.hash) {
      return false;
    }

    return true;
  }
}

//let thecoin = new Blockchain();
//thecoin.addNewBlock(new BlockCrypto(1, "06/04/2021", {sender: "Rabin Yitzack", recipient: "Loyd Eve", quantity: 20}));
//thecoin.addNewBlock(new BlockCrypto(2, "07/04/2021", {sender: "Anita Vyona", recipient: "Felix Mush", quantity: 349}));
//console.log(JSON.stringify(thecoin, null, 4));