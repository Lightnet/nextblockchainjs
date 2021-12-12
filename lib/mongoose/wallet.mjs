/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model
console.log("///////////////////////////////////////////////////////")
import crypto from 'crypto';
//Require Mongoose
import mongoose from 'mongoose';
// crypto 
//import jwt from 'jsonwebtoken';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper.mjs';
//var secret = require('../config').secret;
import { encryptKey, decryptKey } from '../helper.mjs';
//var secret = process.env.SECRET || "secret";
//Define a schema
const Schema = mongoose.Schema;
const WalletSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  created: {
    type:Number,
    default:unixTime
  },
  hash:  Schema.Types.Mixed, //password
  salt: String //auto gen password key
}, {timestamps: true});

WalletSchema.methods.createPair = function(){

  const keypair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  //console.log(keypair);
  
  this.salt = crypto.randomBytes(16).toString('hex');
  //console.log(this.salt);

  //console.log("hello");
  //console.log(JSON.stringify(keypair));
  this.hash = encryptKey(JSON.stringify(keypair),this.salt);
  //this.hash
  //console.log("this.hash");
  //console.log(this.hash);
}

WalletSchema.methods.getPair = function(){
  return JSON.parse(decryptKey(this.hash,this.salt));
}

// Compile model from schema
mongoose.model('Wallet', WalletSchema );
export default WalletSchema;
//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)