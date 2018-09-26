const mongoose = require('mongoose');

const Account = require('database-module/models/admin/Account');

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