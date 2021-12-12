/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

import crypto from 'crypto';
//Require Mongoose
import mongoose from 'mongoose';
// crypto 
//import jwt from 'jsonwebtoken';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper.mjs';
//var secret = require('../config').secret;

//var secret = process.env.SECRET || "secret";

function timeStamp(){
  //return new Date();
  return new Date().getTime();
}
//console.log(new Date());
//let time = new Date().getTime();
//console.log(time);


//Define a schema
const Schema = mongoose.Schema;

const BlockChainSchema = new mongoose.Schema({
  index: {
    required:true,
    type:Number,
  },
  timestamp:{
    required:true,
    type:Schema.Types.Number,
    default: timeStamp()
  },
  transactions: {
    required:false,
    type:Schema.Types.Array,
  },
  index: {
    required:false,
    type:Schema.Types.String,
  },
  hash: {
    required:true,
    type:Schema.Types.String,
  },
  prevHash: {
    required:false,
    type:Schema.Types.String,
  }
});

// Compile model from schema
//mongoose.model('BlockChain', BlockChainSchema );
export default BlockChainSchema;
//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)