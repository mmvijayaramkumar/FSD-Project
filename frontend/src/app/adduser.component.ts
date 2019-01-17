import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'addUser',
  template: `
    <mat-card>
        <form>
            <mat-form-field>
                <input [(ngModel)]="userData.firstName" name="firstName" matInput placeholder="First Name" type="text" required>
            </mat-form-field>
            <br>
            <mat-form-field>
                <input [(ngModel)]="userData.lastName" name="lastName" matInput placeholder="Last Name" type="text" required>
            </mat-form-field>
            <br>
            <mat-form-field>
                <input [(ngModel)]="userData.employeeID" name="employeeID" matInput placeholder="Employee ID" type="number" required>
            </mat-form-field>
            <br>
            <button (click)="post()" mat-raised-button color="primary" *ngIf="!toggle && userData.firstName && userData.lastName && userData.employeeID"> Add </button>
            <button (click)="post()" mat-raised-button color="primary" *ngIf="toggle"> Save </button>
            <button (click)="reset()" mat-raised-button color="warn"> Reset </button>
        </form>
    </mat-card>
    <mat-card>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Employee ID </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let data of userList">
                        <td> {{data.firstName}} </td>
                        <td> {{data.lastName}} </td>
                        <td> {{data.employeeID}} </td>
                        <td> <button (click)="edit(data)" mat-stroked-button color="primary"> Edit </button> </td>
                        <td> <button (click)="delete(task._id)" mat-stroked-button color="warn"> Delete </button> </td>
                    </tr>
                </tbody>    
            </table>
        </div> 
    </mat-card>
  `,
  styles: ['button { margin-right: 5px; } th { padding-left: 50px; padding-bottom: 10px} td { padding-left: 50px; padding-top: 25px} mat-card { margin-right: 15px; margin-top: 5px}']
})
export class AdduserComponent {
    userData = {
        firstName: '',
        lastName: '',
        employeeID: '',
        id: ''
    }
    userList
    returnMessage
    toggle = false

    constructor (private apiService: ApiService) {}
    
    ngOnInit() {
        this.apiService.getusers().subscribe(data => this.userList = data);
        this.userData.firstName = '';
        this.userData.lastName = '';
        this.userData.employeeID = '';
        this.userData.id = '';
    }

    post() {
        if (this.toggle == false) {
            this.apiService.adduser(this.userData).subscribe(res => {
            this.returnMessage = res
                if(this.returnMessage.message == 'Success') {
                    alert('User added')
                    this.ngOnInit();
                    this.toggle = false
                }
            })
        }
       if (this.toggle == true) {
            this.apiService.edituser(this.userData).subscribe(res => {
            this.returnMessage = res
                if(this.returnMessage.message == 'Success') {
                    alert('User saved')
                    this.apiService.getusers().subscribe(data => this.userList = data);
                }
            })
        }
    }

    edit(ws_data) {
        this.userData.firstName = ws_data.firstName;
        this.userData.lastName = ws_data.lastName;
        this.userData.employeeID = ws_data.employeeID;
        this.userData.id = ws_data._id
        this.toggle = true
    }

    reset() {
        this.ngOnInit();
        this.toggle = false
    }
}
