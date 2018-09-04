import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookService, TypeService} from '../../../../core/services';
import {TypeOfBook} from '../../../../core/models/type.model';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Book} from '../../../../core/models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  model;
  bookName: string;
  authorName: string;
  rating = 2.5;
  amount = 1;
  description: string;
  types: TypeOfBook[];
  type: TypeOfBook;
  selectedFile: File;
  url: string;
  @Output() clickButton = new EventEmitter<boolean>();

  constructor(private typeService: TypeService, private  dateFormatter: NgbDateParserFormatter,
              private bookService: BookService
  ) {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = (<FileReader>event.target).result;
      };
      console.log(this.selectedFile);
    }
  }

  ngOnInit() {
    this.typeService.getAll().subscribe(data => {
      this.types = data;
      console.log(this.types);
    });
  }

  save() {
    // console.log({
    //   bookName: this.bookName,
    //   authorName: this.authorName,
    //   rating: this.rating,
    //   amount: this.amount,
    //   description: this.description,
    //   type: this.type,
    //   model: this.dateFormatter.format(this.model)
    // });
    this.bookService.saveImage(this.selectedFile, this.bookName).subscribe(data => {
      console.log(data);
      const savingBook = {
        rating: this.rating,
        datePublished: this.dateFormatter.format(this.model),
        amount: this.amount,
        authorByAuthorId: {name: this.authorName},
        name: this.bookName,
        coverImage: `http://localhost:8080/api/book/files/${data}`,
        description: this.description,

      }as Book;
      this.bookService.createBook(savingBook).subscribe(book => {
        console.log(book);
        this.bookService.createType(book, this.type.id).subscribe(type => {
          alert('Success');
          this.clickButton.emit(false);
        });
      });
    });
    // const savingBook = {
    //   rating: this.rating,
    //   datePublished: this.dateFormatter.format(this.model),
    //   amount: this.amount,
    //   authorByAuthorId: {name: this.authorName},
    //   name: this.bookName,
    //
    // }as Book;
    // this.bookService.create(this.selectedFile).subscribe(data => console.log(data));
  }

  setType(type: TypeOfBook) {
    this.type = type;
  }
}
