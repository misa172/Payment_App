const registerValidate = require('../validations/register.validation');
const registerService = require('../services/register.service');

const User = require('../../../the_root/MongoModel/app/user');
const errorNames = require('../validations/errors-name');

const config = require('the_root/config');

const api = {
  status: 1,
  errors: null,
  user_id: null
};


function logError(info, data,res,errors) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'MONGO_DATA_ID': 
    {
      api.status = 0;
      api.errors = errors;
      api.user_id= data;
      return res.status(200).json(api); 
    }
  }
}

/**
 * @description: register client user by:
 * 1: Check information client send is correctly or not (logic)
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 2. Check user name / email is used or not by access database
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 3. Register successfully
 * 4. Check verify code by using authy
 *      + 1 code just exist about 20 second
 *      + Can send again
 */
module.exports =  (req,res) => {
  // api response to app
  // status: 0 -> success
  // status: 1 -> found error

	// get all errors when user submit regiser:
	// console.log(req.body);
	let { errors, isValid } = registerValidate(req.body);
  // can continue to b2?
  // 400 mean you can get the error
	if(!isValid) {
    api.errors = errors;
    return res.status(200).json(api); 
  }

	let { phone, email } = req.body;
  //	console.log(req.body);
	// Check user name / email is used or not by access database
  registerService.checkEmailExist(email).then( u1 => {
    
    return registerService.checkPhoneExist(phone).then( u2 => [u1,u2] );
  }).then( result => {
    if(!result[0] && !result[1]) {
      console.log('register user');
      registerService.registerUser(req.body,'VN', (info, data) => logError(info,data,res,errors));
    } else if(result[0] || result[1]){
      if(result[1]) errors.phone = errorNames.PHONE_EXIST;
      if(result[0])	errors.email = errorNames.EMAIL_EXIST;
      api.errors = errors;
      return res.status(200).json(api);  
    }
  })
}