const authService = require('../services/authService');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const jwt = require("jsonwebtoken");

const signIn = async(req, res) => {
    User.findOne({userName: req.body.userName})
    .then((resp) => {
        if(!resp) return res.status(404).send({message: "user not found"});
        else {
            var passwordIsValid = bcrypt.compareSync(req.body.password, resp.password)
            console.log('isPasswordValid...', resp.password, req.body.password, passwordIsValid);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
    
            const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
                namedCurve: 'sect239k1'
            });
    
            // generate a signature of the payload
            const sign = crypto.createSign('SHA256');
            sign.write(`${resp}`);
            sign.end();
            var signature = sign.sign(privateKey, 'hex');
            console.log(signature)
    
            // sign username
            var token = jwt.sign({ id: resp.id }, signature, {
                expiresIn: 86400 // 24 hours
            });
    
            var authorities = [];
    
            res.status(200).send({
                id: resp._id,
                username: resp.userName,
                email: resp.email,
                accessToken: token, // access token
                signature: signature // signature
            });
        }
    }).catch((err) => {
        console.log('error...', err);
        res.status(500).send({message: err});
        return;
    })
    // console.log('token...', newToken);
    // .exec((err, user => {
    //     if(err){
    //         res.status(500).send({message: err});
    //         return;
    //     }
    //     if(!user){
    //         return res.status(404).send({message: "user not found"});
    //     }
    //     var passwordIsValid = bcrypt.compareSync(
    //         req.body.password,
    //         user.password
    //     );

    //     if (!passwordIsValid) {
    //         return res.status(401).send({
    //           accessToken: null,
    //           message: "Invalid Password!"
    //         });
    //     }

    //     const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    //         namedCurve: 'sect239k1'
    //     });

    //     // generate a signature of the payload
    //     const sign = crypto.createSign('SHA256');
    //     sign.write(`${user}`);
    //     sign.end();
    //     var signature = sign.sign(privateKey, 'hex');
    //     console.log(signature)

    //     // sign username
    //     var token = jwt.sign({ id: user.id }, signature, {
    //         expiresIn: 86400 // 24 hours
    //     });

    //     var authorities = [];

    //     res.status(200).send({
    //         id: user._id,
    //         username: user.userName,
    //         email: user.email,
    //         accessToken: token, // access token
    //         signature: signature // signature
    //     });
    // }))
}

const signUp = async(req, res) => {
    try{
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        });
        const data = await authService.signUp(user);
        res.json({data: data, status: 'success'});
    }catch(ex){
        res.status(500).json({error: ex.message});
    }
}

module.exports = {
    signIn,
    signUp
}