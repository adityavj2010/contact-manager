import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { UserFormComponent } from '../shared/components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule,RouterTestingModule],
      declarations: [ EditUserComponent,UserFormComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ phoneNumber: 123123122 }) }
        },
        {
          provide: UserService,
          useValue: { getUsers: ()=> of([]) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
