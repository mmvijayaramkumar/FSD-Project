import { Component, Input } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'editTask',
  template: `
    <mat-card>
        <form>
            <mat-form-field>
                <mat-select [(ngModel)]="taskData.projectName" name="projectName" placeholder="Project Name">
                    <mat-option *ngFor="let data of projectList" [value]="data.projectName">
                        {{data.projectName}}
                    </mat-option>
                </mat-select>
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
            <mat-slider [(ngModel)]="taskData.priority" name="slider" min=1 max=30 *ngIf="!taskData.parentFlag"> </mat-slider>
            <br>
            <mat-form-field *ngIf="!taskData.parentFlag">
                <input [(ngModel)]="taskData.priority" name="priority" matInput placeholder="Priority" type="number" required>
            </mat-form-field>
            <br>
            <mat-form-field *ngIf="!taskData.parentFlag">
                 <mat-select [(ngModel)]="taskData.parentTask" name="parentTask" placeholder="Parent Task">
                    <mat-option *ngFor="let data of parentList" [value]="data.taskName">
                        {{data.taskName}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <br>
            <mat-form-field *ngIf="!taskData.parentFlag">
                <input [(ngModel)]="taskData.startDate" name="startDate" matInput placeholder="Start Date" type="date" required>
            </mat-form-field> 
            <br>
            <mat-form-field *ngIf="!taskData.parentFlag">
                <input [(ngModel)]="taskData.endDate" name="endDate" matInput placeholder="End Date" type="date" required>
            </mat-form-field> 
            <br>
            <mat-form-field *ngIf="!taskData.parentFlag">
                <mat-select [(ngModel)]="taskData.user" name="user" required placeholder="User">
                    <mat-option *ngFor="let message of userList" [value] = "message.firstName">
                            {{message.firstName}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <br>
            <button (click)="edit()" mat-raised-button color="primary"> Save </button>
            <button (click)="reset()" mat-raised-button color="warn"> Cancel </button>
        </form>
    </mat-card>
  `,
  styles: ['button { margin-right: 5px; } th { padding-left: 50px; padding-bottom: 10px} td { padding-left: 50px; padding-top: 25px} mat-card { margin-right: 15px; margin-top: 5px}']
})
export class EdittaskComponent{
    @Input() taskData = {}
    user: FormGroup;
    projectList
    parentList
    returnMessage
    checked = false
    ws_projectName

    constructor (private apiService: ApiService, private route: ActivatedRoute) { }
    
    ngOnInit() {
        this.apiService.getprojects().subscribe(data => this.projectList = data);
        this.apiService.getParenttasks().subscribe(data => this.parentList = data);
        var id = this.route.snapshot.params.id
        this.apiService.gettaskByID(id).subscribe(data => {
            this.taskData = data[0]
        });
    }

    edit() {
        this.apiService.edittask(this.taskData).subscribe(res => {
           this.returnMessage = res
            if(this.returnMessage.message == 'Success') {
                alert('Task Saved')
//                this.apiService.getprojects().subscribe(data => this.projectList = data);
            }
        })
    }
}
