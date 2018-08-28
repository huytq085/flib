import { Component, OnInit } from '@angular/core';
import { User } from '../../../core';
import { AuthService } from '../../../core/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: User= new User();
  repassword;

  ngOnInit() {
  }

  checkPass(){
    if(this.user.password===this.repassword){
      return true;
    }
    return false;
  }

  onSubmit(resForm: NgForm){
    if(this.checkPass()){
      this.authService.createUser(this.user).subscribe(data => { 
        alert("Created user");
      });
    }
    this.repassword="";
  }
}
