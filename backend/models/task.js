var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var taskSchema = new mongoose.Schema({
    taskName: String,
    parentFlag: Boolean,
    parentTask: String,
    projectName: String,
    startDate: String,
    endDate: String,
    priority: String,
    status: Boolean,
    user: String
})

module.exports = mongoose.model('Task', taskSchema)
