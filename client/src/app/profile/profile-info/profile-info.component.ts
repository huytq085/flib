import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Profile, UserService, ProfileService } from '../../core';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  infoForm: FormGroup;
  profile: Profile = {} as Profile;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    this.infoForm = this.fb.group({
      phone: '',
      identityCard: '',
      address: '',
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])),
      fullName: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      gender: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // Profile for testing purpose
    // this.profile = {
    //   fullName: "Tran Quang Huy",
    //   address: "Binh Thanh, HCM",
    //   email: "huytq085@gmail.com",
    //   gender: "Male",
    //   identityCard: "123456789",
    //   phone: "016363311029"
    // }
    console.log('profile init')
    this.profileService.getInfo().subscribe(
      data => {
        if (data && data.id){
          console.log(data)
          this.profile = data;
          this.infoForm.patchValue(this.profile);
        }
      }
    )
    
  }

  submitForm() {
    this.isSubmitting = true;
    // update the model
    this.patchProfile(this.infoForm.value);

    this.userService.update(this.profile).subscribe(
      data => {
        if (data && data.id){
          console.log(data);
        }
      }
    )
    this.isSubmitting = false;
  }

  patchProfile(values: Object){
    Object.assign(this.profile, values);
    console.log(this.profile);
  }
}
