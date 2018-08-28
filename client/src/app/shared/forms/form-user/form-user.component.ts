import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User, UserService } from '../../../core';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  @Input() user: User;
  @Output() userEmitter = new EventEmitter<User>();

  userForm: FormGroup;
  isPasswordChange = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])],
      fullName: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])],
      address: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(8),
        Validators.pattern('^([0-9]*)$'),
        Validators.required
      ])],
      gender: ['', Validators.required],
      identityCard: ['', Validators.compose([
        Validators.maxLength(12),
        Validators.minLength(9),
        Validators.pattern('^([0-9]*)$'),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    console.log(this.user);
    if (this.user.email) {
      this.userForm.patchValue(this.user);
      this.isPasswordChange = false;
      if (this.user.password){
        // this.user.password =  
      }
    } else {
      console.log('else')
      this.isPasswordChange = true;
    }
  }

  submitForm() {
    // this.isSubmitting = true;
    // update the model
    this.patchUser(this.userForm.value);
    // submit
    console.log(this.user)
    if (!this.user.id) {
      this.userService.create(this.user).subscribe(
        data => {
          console.log('created');
          console.log(data);
          this.userEmitter.emit(data);
        }
      )
    } else {
      this.userService.update(this.user).subscribe(
        data => {
          console.log('updated');
          console.log(data);
          this.userEmitter.emit(data);
        }
      )
    }


  }

  patchUser(values: any) {
    Object.assign(this.user, values);
  }


}
