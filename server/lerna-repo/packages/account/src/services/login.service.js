const mongoose = require('mongoose');

const Account = require('database/models/admin/account');

/**
 * @description find email in database
 * @param email 
 */
FindAccountByEmail = email => {
    Account.findOne({email}).then(account => {
        return account;
    });
}

module.exports = {
    FindAccountByEmail
}