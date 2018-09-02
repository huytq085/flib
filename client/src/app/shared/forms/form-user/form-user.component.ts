import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User, UserService } from '../../../core';
import { HttpHeaderResponse } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  @Input() user: User;
  @Output() userEmitter = new EventEmitter<User>();

  errors: string = '';
  errorMap: {} = {
    401: 'Sai email hoặc mật khẩu',
    409: 'Email bị trùng'
  }

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
        Validators.maxLength(50),
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
      gender: ['Male', Validators.required],
      identityCard: ['', Validators.compose([
        Validators.maxLength(12),
        Validators.minLength(9),
        Validators.pattern('^([0-9]*)$'),
        Validators.required
      ])]
    },
      { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') }
    );
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      console.log('check ne')
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput && passwordConfirmationInput) {
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({ notEquivalent: true })
        }
        else {
          return passwordConfirmationInput.setErrors(null);
        }
      }

    }
  }


  addPasswordControl() {
    this.userForm.addControl('password', new FormControl('', Validators.compose([
      Validators.maxLength(25),
      Validators.minLength(6),
      Validators.required
    ])));
    this.userForm.addControl('confirmPassword', new FormControl('', Validators.compose([
      Validators.maxLength(25),
      Validators.minLength(6),
      Validators.required,
    ])));
  }

  ngOnInit() {
    console.log(this.user);
    if (this.user.email) {
      this.userForm.patchValue(this.user);
      this.isPasswordChange = false;
      if (this.user.password) {
        delete this.user.password;
      }
    } else {
      console.log('else')
      this.addPasswordControl();

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
          swal({
            title: 'Created successfully',
            type: 'success'
          })
          this.userEmitter.emit(data);
        },
        (err: HttpHeaderResponse) => {
          delete this.user.email;
          this.errors = this.errorMap[err.status];
        }
      )
    } else {
      this.userService.update(this.user).subscribe(
        data => {
          swal({
            title: 'Updated successfully',
            type: 'success'
          })
          this.userEmitter.emit(null);
        }
      )
    }


  }

  patchUser(values: any) {
    Object.assign(this.user, values);
  }

  changePassword() {
    this.addPasswordControl();
    this.isPasswordChange = true;
  }

}
