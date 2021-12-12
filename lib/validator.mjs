import CryptoJS from 'crypto-js';
//import { BlockChain } from './lib/blockchain.mjs';


//let hash = SHA256;
let hash = (data)=>{
  return String(CryptoJS.MD5(data));
}

//let TARGET_HASH = 1560;
let TARGET_HASH = hash(String(1560));

export function validProof(proof){
  let guessHash = hash(String(proof));
  //console.log("hashing: ", guessHash);
  //console.log("proof: ", proof, ":", PROOF);
  return guessHash == TARGET_HASH;
};

export function proofOfWork(){
  let proof = 0;
  while(true){
    //console.log("test....");
    if(!validProof(proof)){
      proof++;
    }else{
      break;
    }
  }
  //return proof;
  return hash(String(proof));
}