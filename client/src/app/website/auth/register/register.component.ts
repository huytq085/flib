import { Component, OnInit } from '@angular/core';
import { User } from '../../../core';
import { AuthService } from '../../../core/services/auth.service';
import { NgForm } from '@angular/forms';
import { HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  user: User= new User();
  repassword;
  errorMessage="";
  errorMap: {} = {
    409: 'Email existed'
  }

  ngOnInit() {
    this.user.gender = 'Male';
  }

  checkPass(){
    if(this.user.password===this.repassword){
      return true;
    }
    return false;
  }

  onSubmit(resForm: NgForm){
    if(this.checkPass()){
      this.authService.createUser(this.user).subscribe((data) => { 
        swal({
          type: 'success',
          title: 'Created Successfully',
        })
        this.router.navigateByUrl('/login')
      },
      (error: HttpHeaderResponse) =>{
        delete this.user.email;
        this.errorMessage= this.errorMap[error.status]
      }
    );
    }else{
      this.repassword="";
    }
  }
}
