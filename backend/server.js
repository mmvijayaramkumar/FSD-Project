var jwt = require('jwt-simple')
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

var User = require('./models/user.js')
var Project = require('./models/project.js')
var Task = require('./models/task.js')

mongoose.Promise = Promise

mongoose.connect('mongodb://localhost:27017/finalFSD', (err) => {
    if (!err)
        console.log('Connected to Mongo')
})

app.use(cors())
app.use(bodyParser.json())

app.post('/adduser', function(req,res) {
    var userdata = req.body
    var user = new User(userdata)
    user.save((err,result) => {
        if(err) { return res.status(500).send({message: 'saving user error'}) }
        res.status(200).send({message: 'Success'})
    })
})

app.post('/addproject', function(req,res) {
    var projectdata = req.body
    projectdata.totalTasks = 0
    projectdata.tasksCompleted = 0
    var project = new Project(projectdata)
    project.save((err,result) => {
        if(err) {
            console.error('saving project error')
            return res.status(500).send({message: 'saving project error'})
        }
        res.status(200).send({message: 'Success'})
    })
})

app.post('/editproject', function(req,res) {
    var projectdata = req.body
    var ws_projectID = req.body.id
    Project.find({_id: ws_projectID}, function(err,projectdocs){
        if(err) {return res.status(500).send({message: 'finding project error'})}
        if(!err){
            projectdocs[0].projectName = projectdata.projectName
            projectdocs[0].startDate = projectdata.startDate
            projectdocs[0].endDate = projectdata.endDate
            projectdocs[0].priority = projectdata.priority
            projectdocs[0].manager = projectdata.manager
            projectdocs[0].save(function(err){
                if(err){return res.status(500).send({message: 'saving project error'})}
                if(!err){res.status(200).send({message: 'Success'})}
            })
        }
    })
})

app.post('/edituser', function(req,res) {
    var userdata = req.body
    var ws_userID = req.body.id
    User.find({_id: ws_userID}, function(err,userdocs) {
        if(err) {return res.status(500).send({message: 'finding user error'})}
        if(!err) {
            userdocs[0].firstName = userdata.firstName
            userdocs[0].lastName = userdata.lastName
            userdocs[0].employeeID = userdata.employeeID
            userdocs[0].save(function(err){
                if(err){return res.status(500).send({message: 'saving user error'})}
                if(!err){res.status(200).send({message: 'Success'})}
            })
        }
    })
})

app.post('/endtask', function(req,res) {
    var ws_taskID = req.body.id
    Task.find({_id: ws_taskID}, function(err,taskdocs){
        if(err) {return res.status(500).send({message: 'finding task error'})}
        if(!err) {
            taskdocs[0].status = true
            taskdocs[0].save(function(err){
                if(err){return res.status(500).send({message: 'ending task error'})}
                if(!err){res.status(200).send({message: 'Success'})}
            })
        }
    })
})

app.post('/edittask', function(req,res) {
    var taskdata = req.body
    var ws_taskID = req.body._id
    Task.find({_id: ws_taskID}, function(err,taskdocs){
        if(err) {return res.status(500).send({message: 'finding task error'})}
        if(!err) {
            taskdocs[0].taskName = taskdata.taskName
            taskdocs[0].parentFlag = taskdata.parentFlag
            taskdocs[0].parentTask = taskdata.parentTask
            taskdocs[0].projectName = taskdata.projectName
            taskdocs[0].startDate = taskdata.startDate
            taskdocs[0].endDate = taskdata.endDate
            taskdocs[0].priority = taskdata.priority
            taskdocs[0].user = taskdata.user

            taskdocs[0].save(function(err){
                if(err){return res.status(500).send({message: 'saving task error'})}
                if(!err){res.status(200).send({message: 'Success'})}
            })
        }
    })
})

app.post('/addtask', function(req,res) {
    var ws_projectName = req.body.projectName
    var taskdata = req.body
    taskdata.status = false
    var task = new Task(taskdata)
    task.save((err,result) => {
        if(err) {return res.status(500).send({message: 'saving task error'})}
        if (!err) {
            Project.find({projectName: ws_projectName}, function(err,projectdocs){
                if(err) {return res.status(500).send({message: 'finding project error'})}
                if(!err) {
                    projectdocs[0].totalTasks = projectdocs[0].totalTasks + 1
                    projectdocs[0].save(function(err){
                        if(err) {return res.status(500).send({message: 'saving project error'})}
                        if(!err) {res.status(200).send({message: 'Success'})}
                    })
                }
            })    
        }
    })
})

app.get('/tasklist', async function(req,res) {
    var tasks = await Task.find({})
    res.send(tasks)
})

app.get('/parenttasks', async function(req,res) {
    var parenttasks = await Task.find({parentFlag: true})
    res.send(parenttasks)
})

app.get('/userlist', async function(req,res) {
    var users = await User.find({})
    res.send(users)
})

app.get('/projectlist', async function(req,res) {
    var projects = await Project.find({})
    res.send(projects)
})

app.post('/tasksByproject', async function(req,res){
    var tasks = await Task.find({projectName: req.body.projectName})
    res.send(tasks)
})

app.post('/tasksByID', async function(req,res){
    var task = await Task.find({_id: req.body.id})
    res.send(task)
})
app.listen(3000)
