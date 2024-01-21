const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'mongotest';
const { MongoClient } = require('mongodb');
const mongoURI = process.env.mongoURI;

router.post('/authen', async(req,res)=>{
  
try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,secret);
    const email = decoded.email;
    res.json({status:"ok", decoded,email})
}catch(err){
    res.json({status:"error",message:"not found token"});
}
})

module.exports = router;