import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }
  userList: Array<User> = []
  @ViewChild('tbody', { static: true }) tbody: ElementRef;
  @ViewChild('selectAll', { static: true }) selectAll: ElementRef;
  isLoading: boolean = false;
  itemsPerPage: number = 5;
  skip: number = 0;

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.userList = users
    }, err => {
      console.error("Error", err)
    })
  }

  toggleSelectAll(event) {
    const selectAll: boolean = event.toElement.checked;
    this.tbody.nativeElement.querySelectorAll('input').forEach(input => {
      input.checked = selectAll
    });
  }

  delete() {
    let toDelete = []
    const inputs = this.tbody.nativeElement.querySelectorAll('input')
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        toDelete.push(inputs[i].getAttribute('identifier'))
      }
    }
    if (toDelete.length === 0) {
      return
    }
    let phoneNumberToDelete = toDelete.join(', ')
    if (confirm("Are you sure you want to delete the following numbers?" + phoneNumberToDelete)) {
      let toDeletePromiseList: Array<Promise<string>> = []
      toDelete.forEach((number) => {
        toDeletePromiseList.push(this.userService.deleteUser({ phoneNumber: number, isActive: true }))

      })
      Promise.all(toDeletePromiseList).then(() => {
        this.selectAll.nativeElement.checked = false
      }).catch(err => {
        this.selectAll.nativeElement.checked = false
      })
    }
    this.skip = 0
  }

  get displayUserList() {
    return this.userList.slice(this.skip, this.skip + this.itemsPerPage)
  }

  changePage(flag) {
    this.skip += flag * this.itemsPerPage
    if (this.skip+1 > this.userList.length) {
      this.skip = this.skip % this.itemsPerPage
    }
    
    if (this.skip < 0) {
      this.skip = 0
    }
  }

  get currentPage() {
    return this.skip / this.itemsPerPage + 1
  }

  get totalPages() {
    let pagesCnt = Math.floor(this.userList.length / this.itemsPerPage)
    pagesCnt = (this.userList.length / this.itemsPerPage) % 1 === 0 ? pagesCnt : pagesCnt + 1
    if(pagesCnt === 0)
    {
      return 1
    }
    return pagesCnt
  }

}
