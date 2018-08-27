
import { Component, OnInit } from '@angular/core';
import { Book } from '../../core/models/book.model';

@Component({
  selector: 'app-profile-contribute',
  templateUrl: './profile-contribute.component.html',
  styleUrls: ['./profile-contribute.component.css']
})
export class ProfileContributeComponent implements OnInit {

  isAdding = false;
  buttonLabel: string = 'Contribute';

  bookContributes: Book[] = new Array();

  constructor() { }

  ngOnInit() {
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

}
