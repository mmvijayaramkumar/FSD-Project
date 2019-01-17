var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var projectSchema = new mongoose.Schema({
    projectName: String,
    startDate: String,
    endDate: String,
    priority: Number,
    manager: String,
    totalTasks: Number,
    tasksCompleted: Number
})

module.exports = mongoose.model('Project', projectSchema)