
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { Book } from '../../../core/models/book.model';
import { ProfileService } from '../../../core';

@Component({
  selector: 'app-profile-contribute',
  templateUrl: './profile-contribute.component.html',
  styleUrls: ['./profile-contribute.component.css']
})
export class ProfileContributeComponent implements OnInit {

  isAdding = false;
  buttonLabel: string = 'Contribute';

  bookContributes: Book[] = new Array();

  

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getContributes().subscribe(
      data => {
        if (data){
          console.log(data)
          this.bookContributes = data;
          
        }
      }
    )
  }

  newContribute(){
    if (!this.isAdding){
      this.isAdding = true;
      this.buttonLabel = 'Back';
    } else {
      this.isAdding = false;
      this.buttonLabel = 'Contribute';
    }
  }

  contributeDone(book: Book){
    console.log('event ne')
    console.log(book)
    this.bookContributes.push(book);

    this.newContribute();
  }

}
