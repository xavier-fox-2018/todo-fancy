require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const routes = require('./routes')


// Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(cors());


// ROUTING

app.use('/', routes);
const server = app.listen(port, ()=> console.log('cors enabled server is listening...'));

