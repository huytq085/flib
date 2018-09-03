import { BookService } from './../../../core/services/book.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { Book } from '../../../core/models/book.model';
import { ProfileService, UserService, Contribute } from '../../../core';
import swal from 'sweetalert2';

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

  currentPage: number = 0;
  totalPages: number;
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.loadContributes();
  }

  loadContributes() {
    let pageConfig = {
      page: this.currentPage,
      size: 5 // Get 5 items
    }
    this.profileService.getContributes(pageConfig).subscribe(
      data => {
        if (data) {
          this.contributes = data['content'];
          this.totalPages = data['totalPages'];
        }
      }
    )
  }

  setPage(i) {
    this.currentPage = i;
    this.loadContributes();
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
        if (data) {
          value.book.id = data.bookId;
          // Set book image to base64 to display in contribute list
          if (value.image) {
            value.book.coverImage = value.image;
          } else {
            value.book.coverImage = this.DEFAULT_IMAGE;
          }
          // Create Types
          for (const type of value.book.types) {
            this.bookService.createType(value.book, type).subscribe();
          }
          
          swal({
            type: 'success',
            title: 'Successful',
          })
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
      this.contributes.unshift({
        bookByBookId: value.book
      } as Contribute
      );
    }

    this.newContribute();
  }

}
