import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Contribute, ProfileService } from '../../../../core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail-contribute',
  templateUrl: './user-detail-contribute.component.html',
  styleUrls: ['./user-detail-contribute.component.css']
})
export class UserDetailContributeComponent implements OnInit {

  contributes: Contribute[] = new Array();
  userId: number;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.userId = +params["id"];
      if (this.userId) {
        this.userService.getContributesByUserId(this.userId).subscribe(
          data => {
            if (data) {
              this.contributes = data;
            }
          }
        )
      }
    });

  }
  action(contribute: Contribute, status) {
    console.log(contribute)
    swal({
      title: (status == 1) ? 'Approve this ticket?' : 'Reject this ticket?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.userService.approveContribute(this.userId, contribute.bookByBookId.id, status).subscribe(
          data => {
            if (data) {
              if (status == 1){
                contribute.status = 1;
              } else {
                this.contributes.splice(this.contributes.indexOf(contribute), 1);
              }
              swal({
                type: 'success',
                title: 'Successful',
              })
            }
          }
        )
      }
    })

  }

}
