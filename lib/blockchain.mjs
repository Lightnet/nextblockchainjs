//let hash = require('object-hash').
import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256.js';
import mongoose from 'mongoose';
import chalk from 'chalk';
import clientDB from './database.mjs';

//import BlockChainSchema from './mongoose/blockchain.mjs';

import {validProof, proofOfWork} from "./validator.mjs";

const hash = (data)=>{
  return String(CryptoJS.MD5(String(data)));
}

const TARGET_HASH = 1560;

//let blockChainModel = mongoose.model('BlockChain')

export class BlockChain{

  constructor(){
    //create
    this.chain = [];
    //Transactions
    this.curr_transactions = [];
  }

  async getLastBlock(callback){
    //get last block from DB
    let db = await clientDB();
    let blockChainModel = db.model('BlockChain')

    console.log('QUERY LASTBLOCK');
    return await blockChainModel.findOne({},null,{
        sort:{
          _id: -1
        },
        limit:1
      }).exec();
  }

  async addNewBlock(prevHash){
    let block = {
      index:this.chain.length+1,
      timestamp: Date.now(),
      transactions:this.curr_transactions,
      //hash:null,
      prevHash, prevHash
    };
    console.log('Checking ...');
    if(proofOfWork() == hash(TARGET_HASH)){
      block.hash = hash(JSON.stringify(block))
      // Added it to the instance
      // save it on the DB
      // console success // mine
      let db = await clientDB();
      let blockChainModel = db.model('BlockChain');
      
      console.log('QUERY BLOCK...')
      let lastBlock = await this.getLastBlock();
        console.log('LAST BLOCK...', lastBlock)
        if(lastBlock){
          //block.prevHash = hash(JSON.stringify(lastBlock))
          block.prevHash = lastBlock.hash;
        }

        let newBlock = new blockChainModel(block)
        console.log('Checking save...');
        await newBlock.save((err)=>{
          if(err) return console.log(chalk.red('Save Error DB ', err.message));
          console.log(chalk.green('Save block on DB!'));
        })

        //Add to chain
        //console.log(block)
        this.chain.push(block);
        //console.log(this.chain)
        this.curr_transactions = [];
        return block;
      

    }
      

    //this.hash = SHA256(JSON.stringify(block)).toString();
    //console.log("this.hash")
    //console.log(this.hash)
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