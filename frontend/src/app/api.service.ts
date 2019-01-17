import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class ApiService {
    parenttasks = []
    childtasks = []
    returnMessage
    path = 'http://localhost:3000'

    constructor (private http: HttpClient) {}

    adduser(message) {
        return this.http.post(this.path + '/adduser', message)
    }

    addproject(message) {
        return this.http.post(this.path + '/addproject', message)
    }

    addtask(message) {
        return this.http.post(this.path + '/addtask', message)
    }

    edittask(message) {
        return this.http.post(this.path + '/edittask', message)
    }

    edituser(message) {
        return this.http.post(this.path + '/edituser', message)
    }

    editproject(message) {
        return this.http.post(this.path + '/editproject', message)
    }

    endTask(task_id) {
        return this.http.post(this.path + '/endtask', {id: task_id})
    }

    getusers() {
        return this.http.get(this.path + '/userlist')
    }    

    getprojects() {
        return this.http.get(this.path + '/projectlist')
    }

    getParenttasks() {
        return this.http.get(this.path + '/parenttasks')
    }

    gettasksByproject(projectName) {
        return this.http.post(this.path + '/tasksByproject', {projectName: projectName})
    }

    gettaskByID(task_id) {
        return this.http.post(this.path + '/tasksByID', {id: task_id})
    }

    deleteParenttask(task_id) {
        this.http.post(this.path + '/deleteparenttask', {id: task_id}).subscribe(res => {
        })
    }
}
