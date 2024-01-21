const express =require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const mongoURI = process.env.mongoURI;

router.get('/data', async (req, res) => {
    let client;
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('Api-nodejs');
        const collection = db.collection('users');

        // ดึงข้อมูลทั้งหมดจากคอลเล็กชัน
        const data = await collection.find({}).toArray();

        // ส่งข้อมูลกลับในการตอบกลับของ API
        res.status(200).json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (client) {
            client.close();
        }
    }
});


module.exports = router;