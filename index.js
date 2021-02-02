require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./Router/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/', router);

app.listen(process.env.PORT || 3001, () => console.log("conectou"));