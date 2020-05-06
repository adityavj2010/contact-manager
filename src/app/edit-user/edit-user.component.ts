import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';
import { sleeper } from '../shared/helpers/misc.helpers';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = null;
  isLoading = false;

  errorMessage = '';
  message = '';

  constructor(private userService: UserService, public route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params) {
        this.userService.getUsers().subscribe(users => {
          this.user = users.find(u => u.phoneNumber === params.phoneNumber);
        });
      }
    });
  }

  ngOnInit() {
  }

  editUser(user) {
    this.isLoading = true
    this.userService.editUser(user).then(sleeper(1000)).then((message) => {
      this.isLoading = false;
      const text: any = message;
      this.message = text;
    }).catch((err) => {
      this.isLoading = false;
      this.errorMessage = err;
    });
  }

}
