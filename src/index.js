require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./routes/routes');
const connectDb = require('./database/conn');

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(bodyParser.json());
app.use('/api/resume', Router);

app.listen(port, () => {
    console.log(`API is listening on the port ${port}`);
});