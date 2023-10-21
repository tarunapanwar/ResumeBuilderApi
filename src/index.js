require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./routes/routes');
const auth = require('./routes/auth');
const connectDb = require('./database/conn');

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(bodyParser.json());
app.use('/api/resume', Router, function(req, res, next){
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}); // user authorization

app.use('/api/auth', auth, function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}); // user authentication

app.listen(port, () => {
    console.log(`API is listening on the port ${port}`);
});