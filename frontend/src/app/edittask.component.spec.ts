import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EdittaskComponent } from './edittask.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
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
import { ApiService } from './api.service';

describe('EdittaskComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
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
      ],
      declarations: [
        EdittaskComponent
      ],
      providers: [ApiService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EdittaskComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});  