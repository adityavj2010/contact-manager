import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input() userData: User;
  @Output() submitData: EventEmitter<User> = new EventEmitter();
  @Input() buttonText = 'Create';
  @Input() isLoading = false;
  isEditForm = false;

  userForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
    isActive: new FormControl(true, Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])

  });
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userData && changes.userData.currentValue && changes.userData.currentValue.phoneNumber && !changes.userData.previousValue) {
      this.userForm.patchValue(changes.userData.currentValue);
      this.isEditForm = true;
    }
  }

  submitForm() {
    this.userForm.markAllAsTouched();
    if (!this.userForm.valid) {
      return;
    }
    this.submitData.emit(this.userForm.value);
  }

  getErrorMessage(controlName, displayName = null) {
    if (!displayName) {
      displayName = controlName;
    }
    if (!this.userForm.get(controlName).touched) {
      return;
    }
    const errors = this.userForm.get(controlName).errors;
    if (errors && Object.keys(errors).length >= 1) {
      if (errors.required) {
        return 'This field is required.';
      }
      if (errors.pattern) {
        return 'Invalid ' + displayName + '.';
      }
      if (errors.minlength || errors.maxlength) {
        return 'Invalid length.';
      }

    }
  }
}
