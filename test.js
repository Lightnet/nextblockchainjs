
const SHA256 = require('crypto-js/sha256');
let { BlockChain } = require('./lib/blockchain.mjs');

let blockChain = new BlockChain();


let PROOF = 1560;
let hash = SHA256;

let validProof = (proof) =>{
  let guessHash = hash(proof)
  console.log("hashing: ", guessHash);
  return guessHash == hash(PROOF);
};

let proofOfWork = () =>{
  let proof = 0;
  while(true){
    if(!validProof(proof)){
      proof++;
    }else{
      break;
    }
  }
  return proof;
}

if(proofOfWork() == PROOF){
  blockChain.addNewTransaction('islem','alex',200);
  let prevHash = blockChain.lastBlock().hash ? blockChain.lastBlock().hash : null;
  blockChain.addNewBlock(prevHash);
}

console.log('chain: ',blockChain.chain);
