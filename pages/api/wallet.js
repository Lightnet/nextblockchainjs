/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { getCsrfToken } from "next-auth/react";

export const config = {
  api: {
    bodyParser: true
  }
};

export default async (req, res)=>{

  const csrfToken = await getCsrfToken();
  const session = await getSession({ req });

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Wallet = await db.model('Wallet');
  //console.log(Wallet);

  if(req.method == 'GET'){
    const wallets = await Wallet.find({userid:userid}).exec();
    //need to rework later
    return res.json({api:"WALLETS",wallets:wallets});
  }

  if(req.method == 'POST'){
    console.log(req.body);
    //return res.end();
    //throw new Error('message test error');
    let newWallet = new Wallet({
      userid:userid
    })
    newWallet.createPair();
    //console.log(newWallet.getPair());
    let doc = await newWallet.save();
    return res.json({api:"CREATE",wallet:doc});
  }

  if(req.method == 'DELETE'){
    console.log(req.body);
    let data = req.body;
    const deleteWallet = await Wallet.findOneAndDelete({id:data.id});
    //console.log("deleteWallet: ", deleteWallet);
    return res.json({api:"DELETE",id:data.id});
  }

  return res.json({error:"NOTFOUND"});
};