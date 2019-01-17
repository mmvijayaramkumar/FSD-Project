import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';

import { AdduserComponent } from './adduser.component';
import { AddprojectComponent } from './addproject.component';
import { AddtaskComponent } from './addtask.component';
import { ViewtaskComponent } from './viewtask.component';
import { EdittaskComponent } from './edittask.component';

const routes=[
  { path: '', component: ViewtaskComponent},
  { path: 'addUser', component: AdduserComponent},
  { path: 'addProject', component: AddprojectComponent},
  { path: 'addTask', component: AddtaskComponent},
  { path: 'viewTask', component: ViewtaskComponent},
  { path: 'editTask/:id', component: EdittaskComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    AddprojectComponent,
    AddtaskComponent,
    ViewtaskComponent,
    EdittaskComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatAutocompleteModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
