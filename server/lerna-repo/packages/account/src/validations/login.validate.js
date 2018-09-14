const Validator = require('validator');
const isEmpty = require('./is-empty.validate');
const errorsName = require('./errors-name');
const bcrypt = require('bcryptjs');

function ValidateLogin(data) {
    
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password: '';

    if(Validator.isEmail(data.email)){
        errors.email  = errorsName.EMAIL_INVALID;
    }

    if(Validator.isEmpty(data.password)) {
        errors.email = errorsName.EMAIL_EMPTY;
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = errorsName.PASSWORD_EMPTY;
    }

    return { 
        errors,
        isValid: isEmpty(errors)
    };

}

function ComparePassword(clientPassword, accountPassword) {
    bcrypt.compare(clientPassword,accountPassword).then( isMatch => { return isMatch;});
}

module.exports = {
    ValidateLogin ,
    ComparePassword
}