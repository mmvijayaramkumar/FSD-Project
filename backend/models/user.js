var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    employeeID: String,
    firstName: String,
    lastName: String
})

module.exports = mongoose.model('User', userSchema)
