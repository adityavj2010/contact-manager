import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  phoneNumber:string = "8855019299"
  constructor(private userService:UserService) { }
  user:User = null
  ngOnInit() {
    this.userService.getUsers().subscribe(users=>{
      this.user = users.find(u=>u.phoneNumber===this.phoneNumber)
    })
  }

  editUser(user){
    this.userService.editUser(user).then().catch()
  }

}
