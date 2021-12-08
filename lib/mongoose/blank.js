/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

import crypto from 'crypto';
//Require Mongoose
import mongoose from 'mongoose';
// crypto 
import jwt from 'jsonwebtoken';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';
//var secret = require('../config').secret;

//var secret = process.env.SECRET || "secret";

//Define a schema
const Schema = mongoose.Schema;

const BlankSchema = new mongoose.Schema({
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
  hash: String, //password
  salt: String //auto gen password key
}, {timestamps: true});

BlankSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

// Compile model from schema
mongoose.model('Blank', BlankSchema );
export default BlankSchema;
//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)