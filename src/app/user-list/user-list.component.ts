import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService) { }
  userList:Array<User> = []
  @ViewChild('tbody',{static:true}) tbody:ElementRef;

  ngOnInit() {
    this.userService.getUsers().subscribe(users=>{
      this.userList = users
    },err=>{
      console.error("Error",err)
    })
  }

  toggleSelectAll(event) {
    const selectAll:boolean = event.toElement.checked;
    this.tbody.nativeElement.querySelectorAll('input').forEach(input => {
      input.checked = selectAll
    });
  }

  delete() {
    let toDelete = []
    const inputs = this.tbody.nativeElement.querySelectorAll('input')
    for(var i =0;i<inputs.length;i++)
    {
      if(inputs[i].checked)
      {
        toDelete.push(inputs[i].getAttribute('identifier'))
      }
    }
  }
}
