const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3002;
const router_alldata = require('./router_alldata');
const router_register = require('./router_register');
const router_login = require('./router_login');
const router_authen = require('./router_authen');

app.use(express.json());

app.get('/data', router_alldata);

app.post('/register',router_register);

app.post('/login',router_login);

app.post('/authen',router_authen);

app.listen(port,() =>{
    console.log("Server in running on port "+port);
})