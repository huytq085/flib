import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TokenStorage } from '../authority/token.storage';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorage,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    if (this.email && this.password) {
      this.authService.attemptAuth(this.email, this.password).subscribe(
        data => {
          alert("Hello mdfk");
          console.log(data);
          this.tokenStorage.saveToken(data);
          this.route.queryParams.subscribe(
            params => {
              if (params['back']){
                this.router.navigateByUrl(params['back'])
              } else {
                this.router.navigateByUrl('/')
              }
              
            }
          )
        },
        error => {
          console.log("You have entered an invalid username or password");
          alert("You have entered an invalid username or password");
          this.password="";
          this.email="";
        }
      )
    }
  }
}
