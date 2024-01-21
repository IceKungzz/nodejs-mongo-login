const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const mongoURI = process.env.mongoURI;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'mongotest';

router.post('/login', async(req,res)=>{
    let client;
    try{
        client = new MongoClient(mongoURI);
        await client.connect();
        console.log("connected database");

        const db = client.db('Api-nodejs');
        const collection = db.collection('users');

        let { email, password } = req.body;
        const data = await collection.findOne({email:email});
        if(!data){
            res.status(500).json({status:"error",message:"Not found user"});
        }else{
            const result_login = await bcrypt.compare(password,data.password);
                if(!result_login){
                    res.status(500).json("incorrect email or password");
                }else{
                    const token = jwt.sign({email: data.email },secret,{expiresIn: '1h'});
                    res.status(200).json({status:"ok",message:"Login Successfully",token});
                }
        }
    }
    catch(err){
        res.send("Server error"+err);
    }
    finally{
        if(client){
            client.close();
        }
    }
})





module.exports = router;