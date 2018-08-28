import { FormGroup, FormBuilder } from '@angular/forms';
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
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: '',
      password: '',
      fullName: '',
      address: '',
      phone: '',
      gender: '',
      identityCard: ''
    });
  }

  ngOnInit() {
    if (this.user){
      this.userForm.patchValue(this.user);
    }
  }

  submitForm(){
    // this.isSubmitting = true;
    // update the model
    this.patchUser(this.userForm.value);
    // submit
    console.log(this.user)
    if (!this.user.id){
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

  patchUser(values: any){
    Object.assign(this.user, values);
  }


}
