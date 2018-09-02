
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { Book } from '../../../core/models/book.model';
import { ProfileService, UserService, Contribute } from '../../../core';

@Component({
  selector: 'app-profile-contribute',
  templateUrl: './profile-contribute.component.html',
  styleUrls: ['./profile-contribute.component.css']
})
export class ProfileContributeComponent implements OnInit {

  isAdding = false;
  DEFAULT_IMAGE = 'http://localhost:8080/images/cover_image_default.jpg';
  buttonLabel: string = 'Contribute';

  contributes: Contribute[] = new Array();

  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.profileService.getContributes().subscribe(
      data => {
        if (data) {
          console.log(data)
          this.contributes = data;
        }
      }
    )
  }

  newContribute() {
    if (!this.isAdding) {
      this.isAdding = true;
      this.buttonLabel = 'Back';
    } else {
      this.isAdding = false;
      this.buttonLabel = 'Contribute';
    }
  }

  contributeDone(value: any) {
    console.log(value);
    this.userService.contribute(value.book).subscribe(
      data => {
        console.log(data)
        value.book.id = data.bookId;
        // Set book image to base64 to display in contribute list
        if (value.image) {
          value.book.coverImage = value.image;
        } else {
          value.book.coverImage = this.DEFAULT_IMAGE;
        }

      }
    )
    let isNew = true;
    this.contributes.forEach((contribute, index, array) => {
      if (contribute.bookByBookId.id == value.book.id) {
        contribute.bookByBookId.amount += value.book.amount;
        isNew = false;
      }

    })
    if (isNew) {
      this.contributes.push({
        bookByBookId: value.book
      } as Contribute
      );
    }

    this.newContribute();
  }

}
