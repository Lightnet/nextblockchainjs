





//import SHA256 from 'crypto-js/sha256.js';
import CryptoJS from 'crypto-js';
import { BlockChain } from './lib/blockchain.mjs';
import clientDB from './lib/database.mjs';
import {proofOfWork} from './lib/validator.mjs';

let PROOF = 1560;

let hash = (data)=>{
  return String(CryptoJS.MD5(String(data)));
}

async function main(){
  let db = await clientDB();

  console.log("init block")
  let blockChain = new BlockChain();

  console.log("check...")
  console.log(proofOfWork())
  console.log(hash(PROOF))
  console.log("hash...")
  if(proofOfWork() == hash(PROOF)){
    console.log("PASS!!!")
    blockChain.addNewTransaction('islem','alex',200);
    let prevHash = blockChain.lastBlock() ? blockChain.lastBlock().hash : null;
    await blockChain.addNewBlock(prevHash);

    console.log('chain: ',blockChain.chain);
  }else{
    console.log("fail check")
  }
}

main();




/*
let PROOF = 156;
//let hash = SHA256;
let hash = (data)=>{
  return String(CryptoJS.MD5(data));
}
// https://github.com/brix/crypto-js/issues/28

let validProof = (proof) =>{
  let guessHash = hash(String(proof));
  console.log("hashing: ", guessHash);
  //console.log("proof: ", proof, ":", PROOF);
  return guessHash == hash(String(PROOF));
};

let proofOfWork = () =>{
  let proof = 0;
  while(true){
    //console.log("test....");
    if(!validProof(proof)){
      proof++;
    }else{
      break;
    }
  }
  return proof;
}
*/
//console.log("String() => ", String(CryptoJS.MD5('hello')));
//console.log("String() => ", String(CryptoJS.MD5('hello')));
/*
if(proofOfWork() == PROOF){
  blockChain.addNewTransaction('islem','alex',200);
  let prevHash = blockChain.lastBlock() ? blockChain.lastBlock().hash : null;
  blockChain.addNewBlock(prevHash);
}

console.log('chain: ',blockChain.chain);
*/
