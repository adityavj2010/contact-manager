import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts';
  constructor(private userService:UserService)
  {
    this.userService.addUser(seed[0]).catch(e=>e)
    this.userService.addUser(seed[1]).catch(e=>e)
  }
}

const seed:Array<User> = [{
  phoneNumber:'8855019299',
  isActive:true,
  firstName:"Aditya",
  lastName:"Jagtap",
  email:"adityavj2010@gmail.com"
},
{
  phoneNumber:'9921097126',
  isActive:false,
  firstName:"Tejas",
  email:"tejas@jkh.com"
}
]
