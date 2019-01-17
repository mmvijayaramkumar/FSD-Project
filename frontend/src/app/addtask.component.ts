import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'addTask',
  template: `
    <mat-card>
        <form>
            <mat-form-field>
                <input [(ngModel)]="taskData.projectName" name="projectName" matInput placeholder="Project Name" [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete">
                    <mat-option *ngFor="let data of projectList" [value]="data.projectName">
                        {{data.projectName}}
                    </mat-option>
                </mat-autocomplete>
            </mat-form-field>
            <br>
            <mat-form-field>
                <input [(ngModel)]="taskData.taskName" name="taskName" matInput placeholder="Task Name" type="text" required>
            </mat-form-field>
            <br>
            <section class="example-section">
                <mat-checkbox class="example-margin" [(ngModel)]="taskData.parentFlag" name="parentFlag">Parent Task</mat-checkbox>
            </section>
            <br>
            <mat-slider *ngIf="!taskData.parentFlag" [(ngModel)]="taskData.priority" name="slider" min=1 max=30> </mat-slider>
            <br *ngIf="!taskData.parentFlag">
            <mat-form-field *ngIf="!taskData.parentFlag">
                <input [(ngModel)]="taskData.priority" name="priority" matInput placeholder="Priority" type="number" required>
            </mat-form-field>
            <br *ngIf="!taskData.parentFlag">
            <mat-form-field *ngIf="!taskData.parentFlag">
                 <mat-select [(ngModel)]="taskData.parentTask" name="parentTask" placeholder="Parent Task">
                    <mat-option *ngFor="let data of parentList" [value]="data.taskName">
                        {{data.taskName}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <br *ngIf="!taskData.parentFlag">
            <mat-form-field *ngIf="!taskData.parentFlag">
                <input [(ngModel)]="taskData.startDate" name="startDate" matInput placeholder="Start Date" type="date" required>
            </mat-form-field> 
            <br *ngIf="!taskData.parentFlag">
            <mat-form-field *ngIf="!taskData.parentFlag">
                <input [(ngModel)]="taskData.endDate" name="endDate" matInput placeholder="End Date" type="date" required>
            </mat-form-field> 
            <br *ngIf="!taskData.parentFlag">
            <mat-form-field *ngIf="!taskData.parentFlag">
                <mat-select [(ngModel)]="taskData.user" name="user" required placeholder="User">
                    <mat-option *ngFor="let message of userList" [value] = "message.firstName">
                            {{message.firstName}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <br *ngIf="!taskData.parentFlag">
            <button (click)="post()" mat-raised-button color="primary" *ngIf="taskData.projectName && taskData.taskName"> Add </button>
            <button (click)="reset()" mat-raised-button color="warn"> Reset </button>
        </form>
    </mat-card>
  `,
  styles: ['button { margin-right: 5px; } th { padding-left: 50px; padding-bottom: 10px} td { padding-left: 50px; padding-top: 25px} mat-card { margin-right: 15px; margin-top: 5px}']
})
export class AddtaskComponent {
    taskData = {
        parentFlag: false,
        taskName: '',
        parentTask: '',
        projectName: '',
        startDate: '',
        endDate: '',
        priority: '',
        user: ''
    }
    userList
    projectList
    parentList
    returnMessage
    checked = false

    constructor (private apiService: ApiService) {}
    
    ngOnInit() {
        this.apiService.getusers().subscribe(data => this.userList = data);
        this.apiService.getprojects().subscribe(data => this.projectList = data);
        this.apiService.getParenttasks().subscribe(data => this.parentList = data);
    }

    post() {
        this.apiService.addtask(this.taskData).subscribe(res => {
           this.returnMessage = res
            if(this.returnMessage.message == 'Success') {
                alert('Task added')
                this.apiService.getParenttasks().subscribe(data => this.parentList = data);
            }
        })
    }
    reset() {
        this.taskData.parentFlag = false
        this.taskData.taskName = ''
        this.taskData.parentTask = ''
        this.taskData.projectName = ''
        this.taskData.startDate = ''
        this.taskData.endDate = ''
        this.taskData.priority = ''
        this.taskData.user = ''
    }
}
