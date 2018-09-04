import {Component, OnInit} from '@angular/core';
import {BookService, TypeService} from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../../core/models';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {TypeOfBook} from '../../../core/models/type.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  model;
  book: Book;
  selectedFile: File;
  url: string;
  types: TypeOfBook[];
  type: TypeOfBook;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private typeService: TypeService,
              private dateFormatter: NgbDateParserFormatter,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const number = params['id'];
      this.bookService.getBook(number).subscribe(book => {
        this.book = book;
        this.typeService.getAll().subscribe(data => {
          this.types = data;
          console.log(this.types);
        });
      });
    });
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

  setType(type: TypeOfBook) {
    this.type = type;
  }

  save() {
    if (this.url) {
      this.bookService.saveImage(this.selectedFile, this.book.name).subscribe(data => {
        console.log(data);
        const updatingBook = {
          id: this.book.id,
          rating: this.book.rating,
          datePublished: this.dateFormatter.format(this.model),
          amount: this.book.amount,
          authorByAuthorId: {name: this.book.authorByAuthorId.name},
          name: this.book.name,
          coverImage: `http://localhost:8080/api/book/files/${data}`,
          description: this.book.description,
        }as Book;
        this.bookService.updateBook(updatingBook).subscribe(book => {
          console.log(book);
          // this.bookService.createType(book, this.type.id).subscribe(type => {
          alert('Success');
          this.router.navigate([`/admin/book/page/1`]);
          // });
        });
      });
    } else {
      const updatingBook = {
        id: this.book.id,
        rating: this.book.rating,
        datePublished: this.dateFormatter.format(this.model),
        amount: this.book.amount,
        authorByAuthorId: {id: this.book.authorByAuthorId.id, name: this.book.authorByAuthorId.name},
        name: this.book.name,
        description: this.book.description,
      }as Book;
      this.bookService.updateBook(updatingBook).subscribe(book => {
        console.log(book);
        alert('Success');
        this.router.navigate([`/admin/book/page/1`]);
      });
    }
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
}
