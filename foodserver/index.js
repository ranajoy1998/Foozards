const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const { mongoose } = require('./db.js');
var foodController = require('./controllers/foodController.js');

var app = express();

app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4000'}))

app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/foods', foodController);