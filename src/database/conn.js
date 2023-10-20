require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async() => {
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_LOCAL_URI);
        console.log('mongo db is connected...');
    }catch(err){
        console.log('mongo db is not connected', err.message);
    }
}

module.exports = connectDb;
