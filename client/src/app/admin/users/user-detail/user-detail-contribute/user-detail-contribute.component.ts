import { Component, OnInit } from '@angular/core';
import { Contribute, ProfileService } from '../../../../core';

@Component({
  selector: 'app-user-detail-contribute',
  templateUrl: './user-detail-contribute.component.html',
  styleUrls: ['./user-detail-contribute.component.css']
})
export class UserDetailContributeComponent implements OnInit {

  contributes: Contribute[] = new Array();

  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.profileService.getContributes().subscribe(
      data => {
        if (data) {
          this.contributes = data;
        }
      }
    )
  }

}
