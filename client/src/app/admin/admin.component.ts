import { UserService } from './../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log('admin ne')
    this.profileService.getInfo().subscribe(
      data => {
        
        if (data){
          console.log('co data ne')
          console.log(data)
          this.userService.setCurrentUser(data);
        }
      }
    )
  }

}
