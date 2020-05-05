import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isLoading: boolean = false
  errorMessage:string = ''
  message:string = ''

  constructor(private userService:UserService ) { }

  ngOnInit() {
  }

  addUser($event) {
    this.isLoading = true
    this.message= ''
    this.errorMessage = ''
    this.userService.addUser($event).then(sleeper(1000)).then((message)=>{
      this.isLoading = false
      const text:any = message
      this.message = text
    }).catch((err)=>{
      this.isLoading = false
      this.errorMessage = err
    })
  }
}
