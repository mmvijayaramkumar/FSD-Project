import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'addProject',
  template: `
    <mat-card>
        <form>
            <mat-form-field>
                <input [(ngModel)]="projectData.projectName" name="projectName" matInput placeholder="Project Name" type="text" required>
            </mat-form-field>
            <br>
            <mat-slider [(ngModel)]="projectData.priority" name="slider" min=1 max=30> </mat-slider>
            <br>
            <mat-form-field>
                <input [(ngModel)]="projectData.priority" name="priority" matInput placeholder="Priority" type="number" required>
            </mat-form-field>
            <br>
            <section class="example-section">
                <mat-checkbox class="example-margin" [(ngModel)]="checked" name="checked">Set Start date & End date</mat-checkbox>
            </section>
            <br>
            <mat-form-field *ngIf="checked">
                <input [(ngModel)]="projectData.startDate" name="startDate" matInput placeholder="Start Date" type="date" required>
            </mat-form-field>
            <br>
            <mat-form-field *ngIf="checked">
                <input [(ngModel)]="projectData.endDate" name="endDate" matInput placeholder="End Date" type="date" required>
            </mat-form-field> 
            <br>
            <mat-form-field *ngIf="checked">
                <mat-select [(ngModel)]="projectData.manager" name="manager" required placeholder="Manager">
                    <mat-option *ngFor="let message of userList" [value] = "message.firstName">
                            {{message.firstName}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <br>
            <button (click)="post()" mat-raised-button color="primary" *ngIf="!toggle && projectData.projectName"> Add </button>
            <button (click)="post()" mat-raised-button color="primary" *ngIf="toggle"> Save </button>
            <button (click)="reset()" mat-raised-button color="warn" > Reset </button>
        </form>
    </mat-card>
    <mat-card>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th> Project Name </th>
                        <th> No. of Tasks </th>
                        <th> Completed </th>
                        <th> Start Date </th>
                        <th> End Date </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let data of projectList">
                        <td> {{data.projectName}} </td>
                        <td> {{data.totalTasks}} </td>
                        <td> {{data.tasksCompleted}} </td>
                        <td> {{data.startDate}} </td>
                        <td> {{data.endDate}} </td>
                        <td> <button (click)="edit(data)" mat-stroked-button color="primary"> Update </button> </td>
                        <td> <button (click)="delete(task._id)" mat-stroked-button color="warn"> Suspend </button> </td>
                    </tr>
                </tbody>    
            </table>
        </div> 
    </mat-card>
  `,
  styles: ['button { margin-right: 5px; } th { padding-left: 50px; padding-bottom: 10px} td { padding-left: 50px; padding-top: 25px} mat-card { margin-right: 15px; margin-top: 5px}']
})
export class AddprojectComponent {
    projectData = {
        projectName: '',
        startDate: '',
        endDate: '',
        priority: '',
        manager: '',
        totalTasks: '',
        tasksCompleted: '',
        id: ''
    }
    userList
    projectList
    returnMessage
    checked = false
    toggle = false

    constructor (private apiService: ApiService) {}
    
    ngOnInit() {
        this.apiService.getusers().subscribe(data => this.userList = data);
        this.apiService.getprojects().subscribe(data => this.projectList = data);
        this.projectData.projectName = ''
        this.projectData.startDate = ''
        this.projectData.endDate = ''
        this.projectData.priority = ''
        this.projectData.manager = ''
        this.projectData.totalTasks = ''
        this.projectData.tasksCompleted = ''
    }

    post() {
        if(this.toggle == false) {
            this.apiService.addproject(this.projectData).subscribe(res => {
                this.returnMessage = res
                if(this.returnMessage.message == 'Success') {
                    alert('Project added')
                    this.ngOnInit();
                    this.toggle = false
                }
            })
        }
        if(this.toggle == true) {
            this.apiService.editproject(this.projectData).subscribe(res => {
                this.returnMessage = res
                if(this.returnMessage.message == 'Success') {
                    alert('Project saved')
                    this.ngOnInit();
                    this.toggle = false
                }
            })
        }
    }
    edit(ws_data) {
        this.projectData.projectName = ws_data.projectName
        this.projectData.startDate = ws_data.startDate
        this.projectData.endDate = ws_data.endDate
        this.projectData.priority = ws_data.priority
        this.projectData.manager = ws_data.manager
        this.projectData.id = ws_data._id
        this.checked = false
        if(ws_data.startDate) {
            this.checked = true
        }
        this.toggle = true
    }
    reset() {
        this.ngOnInit();
        this.toggle = false
        this.checked = false
    }
}
