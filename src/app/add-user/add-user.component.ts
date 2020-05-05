import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { sleeper } from '../shared/helpers/misc.helpers';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isLoading = false;
  errorMessage = '';
  message = '';

  constructor(private userService: UserService ) { }

  ngOnInit() {
  }

  addUser(user) {
    this.isLoading = true;
    this.message = '';
    this.errorMessage = '';
    this.userService.addUser(user).then(sleeper(1000)).then((message) => {
      this.isLoading = false;
      const text: any = message;
      this.message = text;
    }).catch((err) => {
      this.isLoading = false;
      this.errorMessage = err;
    });
  }
}
