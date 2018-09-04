import {Component, OnInit} from '@angular/core';
import {Profile, UserService} from '../../../';
import {TokenStorage} from '../../../../website/auth/authority/token.storage';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  profile: Profile = {} as Profile;

  constructor(
    private tokenStorage: TokenStorage,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    console.log(this.userService.getCurrentUser());
    this.userService.currentUser.subscribe(
      data => {
        this.profile = data;
      }
    );
  }

}
