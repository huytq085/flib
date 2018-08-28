import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[] = new Array();
  isEditor:boolean = false;
  selectedUser: User;
  buttonLabel: string = 'New User';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        console.log(data);
        this.users = data;
      }
    )
  }

  displayForm(user?: User){
    if (user){
      this.selectedUser = user;
    }
    this.isEditor = !this.isEditor;
    this.buttonLabel = this.isEditor ? 'Back' : 'New User';
    console.log('display');
    console.log(this.isEditor);
  }

  userEmit(user: User){
    console.log(user);
    this.users.push(user);
    this.displayForm();
  }

  delete(user: User){
    this.userService.delete(user.id).subscribe(
      data => {
        this.users.splice(this.users.indexOf(user), 1)
      }
    )
  }


}
