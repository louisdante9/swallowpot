// const express = require('express');
import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import configDB from './config/db'
import routes from './routes/index'
require('dotenv').config();


// configuration ===============================================================
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(configDB.url, { useMongoClient: true }); // connect to our database  
  console.log('this is connected')
} else {
  mongoose.connect(configDB.url_production,{ useMongoClient: true }); // connect to our database
}


const app = express();
const port = process.env.PORT || 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,x-access-token');
  next();
});
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//this is a middleware
app.use('/api/v1', routes);

app.get('/', (req, res)=> {
  res.send('hello collins!!')
}).listen(port, ()=> {
  console.log(`Server is running on ${port}`)
})