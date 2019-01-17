import { Component } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <h1> Task Manager </h1>
    <mat-toolbar>    
        <button mat-stroked-button routerLink="/addProject" routerLinkActive="mat-accent"> Add Project </button>
        <button mat-stroked-button routerLink="/addTask" routerLinkActive="mat-accent"> Add Task </button>
        <button mat-stroked-button routerLink="/addUser" routerLinkActive="mat-accent"> Add User </button>
        <button mat-stroked-button routerLink="/viewTask" routerLinkActive="mat-accent"> View Task </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: ['button { margin-right: 5px; }']
})
export class AppComponent {
  title = 'Task Manager';
}
