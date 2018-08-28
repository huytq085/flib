import { ProfileService } from './../../../services/profile.service';
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

  profile: Profile;

  constructor(
    private tokenStorage: TokenStorage,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getInfo().subscribe(
      data => {
        if (data){
          this.profile = data;
        }
      }
    )
  }

}
