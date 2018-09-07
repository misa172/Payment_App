const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const config = require('../config/config');
const Account = require('../models/Account');
const randomString = require('../config/random-string');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '15520884@gm.uit.edu.vn',
        pass: '7055109674'
    },
    tls: { rejectUnauthorized: false }
});

const HashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch(err) {
        throw new Error('Hash failed ', err);
    }
}


const ComparePassword = async (input, hashPass) => {
    try {
        return await bcrypt.hash(input, hashPass);
    } catch(err) {
        throw new Error('Comparing failed ', err);
    }
}

const SendVerifyEmail = (e,id) => {

    jwt.sign(
        { id }, // payload -> data
        config.EMAIL_SECRET, // secret algorithms
        { expiresIn:config.MAIL_EXPIRE }, // day exist
        (err, emailToken) => {     
            console.log(emailToken);   
            const url = 'http://localhost:3000/verify/' + emailToken;
            transporter.sendMail({
                from: 'Admin',
                to: e,
                subject: 'Confirm email',
                text: 'You receive message from server' ,
                html: 'Please click this email to confirm your email: <a href=' + url + '>' + url + '</a>'
            },(err,info) => {
                if(err) console.log(err);
                console.log('send: ',info);
            });       
        }
    );
}

/**
 * @description Register account
 * 1. Check email is in database or not
 * 2. Validate data [ avatar, name, phone, gender, age, role ] => true
 * 3. Generate default password
 * 3. Send email to verify
 */
const registerRoute = async (req, res ) => {
    // Check email existed in database or not
    const acc = await Account.findOne({ email: req.body.email })
    
    // if account has already existed in database
    // Just log 
    if(acc) return res.status(400).json({ email: 'email already exists' });   
    

    // Get avatar from email
    // create image size: 200
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d:'mm' });

    // Generate default password:
    const password = await HashPassword( Math.random().toString(36).slice(-8));

    // generate secret token for email verity
    // const secretToken = randomString.generate();
   // console.log('Secret token: ',secretToken);

    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    // Create new account:
    const newAccount = await new Account({  name ,  email,  phone, age, avatar, password });
    
    // Save account into database
    newAccount.save() 
    .then( account => {
       // console.log(account._id);
       
       // Send email to verify 
       SendVerifyEmail(email,account._id);
       
        res.json(account);
    }) 
    .catch( err => console.log(err) );

};

/**
 * @description Updating when verify email account
 * 1. Get token
 * 2. Update account is verified [ activate => true ]
 */
verifyRoute =  (req,res) => {
    //  Get token
    const {id:_id} = jwt.verify(req.params.token, config.EMAIL_SECRET);

    res.json(jwt.verify(req.params.token, config.EMAIL_SECRET));
    
    Account.updateOne({_id},{ $set: { activate: true }},(err,raw)=>{
        if(err) return err;
        // console.log('The raw response from Mongo was ',raw);
    });   
  
};


module.exports.RegisterRoute = registerRoute;
module.exports.VerifyRoute = verifyRoute;