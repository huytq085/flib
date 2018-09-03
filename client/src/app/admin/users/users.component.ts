import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core';
import swal from 'sweetalert2';
import { Subject, of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {
  currentUser: User;
  users: User[] = new Array();
  isEditor: boolean = false;
  selectedUser: User;
  buttonLabel: string = 'New User';
  currentPage: number = 0;
  userSize: number = 5; //get 5 items
  totalPages: number = 0;
  // pages: number[] = new Array();

  private searchTerm$: Subject<string> = new Subject();


  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.loadUsers();
    this.loadSearch();
  }

  loadSearch() {
    this.search(this.searchTerm$).subscribe(
      data => {
        this.users = data.filter(data => (data.email != this.currentUser.email));
      });

  }
  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.userService.search(term))
    )
  }

  loadUsers() {
    let pageConfig = {
      page: this.currentPage,
      size: this.userSize
    }
    this.userService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.userService.getAll(pageConfig).subscribe(
          data => {
            console.log(data);
            this.users = data['content'];
            this.totalPages = data['totalPages'];
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
    console.log('keyup: ' + event.target.value)
    if (event.target.value == ''){
      this.loadUsers();
    } else {
      this.searchTerm$.next(event.target.value);
    }
    
  }


}
