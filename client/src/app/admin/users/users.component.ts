import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core';
import swal from 'sweetalert2';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[] = new Array();
  isEditor: boolean = false;
  selectedUser: User;
  buttonLabel: string = 'New User';
  currentPage: number = 0;
  userSize: number = 5;
  totalPages: number;
  pages: number[] = new Array();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.currentUser.subscribe(
      user => {
        this.userService.getUsersPages(this.currentPage, this.userSize).subscribe(
          data => {
            console.log(data);
            this.users = data['content'];
            this.totalPages = data['totalPages'];
            this.pages = new Array(data['totalPages']);
          }
        )
      }
    )
  }

  setPage(i) {
    this.currentPage = i;
    this.loadUsers();
  }

  displayForm(user?: User) {
    if (user) {
      this.selectedUser = user;
    }
    this.isEditor = !this.isEditor;
    this.buttonLabel = this.isEditor ? 'Back' : 'New User';
    console.log('display');
    console.log(this.isEditor);
  }

  userEmit(user: User) {
    console.log(user);
    if (user) {
      this.users.push(user);
    }
    this.displayForm();
  }

  delete(user: User) {
    swal({
      title: 'Delete this user',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(user.id).subscribe(
          data => {
            this.users.splice(this.users.indexOf(user), 1);
            swal({
              type: 'success',
              title: 'Successful',
            })
          }
        )
      }
    })

  }

  searching(event) {
    this.userService.currentUser.subscribe(
      user => {
        this.userService.search(event.target.value).subscribe(
          data => {
            this.users = data.filter(data => (data.email != user.email));
          }
        )
      }
    )
  }


}
