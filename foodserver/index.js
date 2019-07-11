const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const { mongoose } = require('./db.js');
var foodController = require('./controllers/foodController.js');

var app = express();

app.use(bodyParser.json());
app.use(cors({origin:['http://localhost:4000', 'http://localhost:4200']}))

app.listen(3002, () => console.log('Server started at port : 3002'));


app.use('/foods', foodController);