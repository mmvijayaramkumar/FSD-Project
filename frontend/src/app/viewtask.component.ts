import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'viewTask',
  template: `
    <mat-card>
        <form>
            <mat-form-field>
                <input [(ngModel)]="projectData.projectName" name="projectName" matInput placeholder="Project Name" [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete">
                    <mat-option *ngFor="let data of projectList" [value]="data.projectName">
                        {{data.projectName}}
                    </mat-option>
                </mat-autocomplete>
            </mat-form-field>
            <button (click)="findTasks(projectData.projectName)" mat-mini-fab color="primary"> Find </button>
        </form>
    </mat-card>
    <mat-card>
        <table class="table">
            <thead>
                <tr>
                    <th> Task Name </th>
                    <th> Parent Task </th>
                    <th> Priority </th>
                    <th> Start Date </th>
                    <th> End Date </th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let data of taskList">
                    <td> {{data.taskName}} </td>
                    <td> {{data.parentTask}} </td>
                    <td> {{data.priority}} </td>
                    <td> {{data.startDate}} </td>
                    <td> {{data.endDate}} </td>
                    <td> <button mat-raised-button color="primary" routerLink="/editTask/{{data._id}}" *ngIf="!data.status"> Edit </button> </td>
                    <td> <button (click)="endTask(data)" mat-raised-button color="accent" *ngIf="!data.status"> End Task </button> </td>
                </tr>
            </tbody>    
        </table>
    </mat-card>
  `,
  styles: ['button { margin-right: 5px; margin-left: 10px} th { padding-left: 50px; padding-bottom: 10px} td { padding-left: 50px; padding-top: 25px} mat-card { margin-right: 15px; margin-top: 5px}']
})
export class ViewtaskComponent {
    projectData = {}
    taskList
    projectList
    parentList
    returnMessage
    ws_projectName
    checked = false

    constructor (private apiService: ApiService) {}
    
    ngOnInit() {
        this.apiService.getprojects().subscribe(data => this.projectList = data);
    }

    findTasks(ws_projectName) {
        this.apiService.gettasksByproject(ws_projectName).subscribe(res => {
            this.taskList = res
        })
    }

    endTask(taskData) {
        this.ws_projectName = taskData.projectName
        this.apiService.endTask(taskData._id).subscribe(res => {
            this.returnMessage = res
            if(this.returnMessage.message == 'Success') {
                alert('Task closed')
                this.apiService.gettasksByproject(this.ws_projectName).subscribe(res => this.taskList = res)
            }
        })
    }
}
