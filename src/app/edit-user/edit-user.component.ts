import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = null;
  isLoading:boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userService.getUsers().subscribe(users => {
        this.user = users.find(u => u.phoneNumber === params.phoneNumber)
      })
    })
  }

  ngOnInit() {
  }

  editUser(user) {
    this.userService.editUser(user).then().catch()
  }

}
