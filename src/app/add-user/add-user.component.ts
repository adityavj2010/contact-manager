import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isLoading: boolean = false
  constructor(private userService:UserService ) { }

  ngOnInit() {
  }

  addUser($event) {
    console.warn("Received User",$event)
    this.isLoading = true
    this.userService.addUser($event).then(()=>{
      this.isLoading = false
    }).catch((data)=>{
      this.isLoading = false
    })
  }
}
