const userModel = require('../models/userModel');

const signUp = async(user) => {
    var user = userModel.create(user);
    return user;
}

module.exports = {signUp}