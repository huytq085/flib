import { UserService } from './../../../services/user.service';
import { TokenStorage } from './../../../../website/auth/authority/token.storage';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../..';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  profile: Profile = {} as Profile;

  constructor(
    private tokenStorage: TokenStorage,
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log(this.userService.getCurrentUser())
    this.userService.currentUser.subscribe(
      data => {
        this.profile = data;
      }
    )
  }

}
