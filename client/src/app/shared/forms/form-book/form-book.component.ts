import { Author } from './../../../core/models/author.model';
import { BookService } from './../../../core/services/book.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Book } from '../../../core/models/book.model';
import { UserService, Profile } from '../../../core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { Subject, Observable, concat, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { TypeOfBook } from '../../../core/models/type.model';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {
  bookForm: FormGroup;
  isSubmitting = false;
  isLoading = false;
  book: Book = {} as Book;
  isNewBook = false;
  booksObservable$: Observable<Book[]>;
  bookInput$ = new Subject<string>();
  author: Author = {} as Author;
  isNewAuthor = false;
  authorsObservable$: Observable<Author[]>;
  authorInput$ = new Subject<string>();
  typesObservable$: Observable<TypeOfBook[]>;
  imagePreview;

  isDefaultImage = false;

  @Output() bookEmitter = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      coverImage: null,
      name: '',
      description: '',
      author: '',
      amount: '',
      types: ''
    });
  }

  ngOnInit() {
    this.loadBooks();
    this.loadAuthors();
    this.loadTypes();

  }
  loadBooks() {
    this.booksObservable$ = concat(
      of([]), // default items
      this.bookInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(term => this.bookService.searchBooks(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.isLoading = false)
        ))
      )
    );
  }
  loadTypes() {
    this.typesObservable$ = this.bookService.getTypes();
  }
  loadAuthors() {
    this.authorsObservable$ = concat(
      of([]), // default items
      this.authorInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(term => this.bookService.searchAuthors(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.isLoading = false)
        ))
      )
    );
  }

  submitForm() {

    swal({
      title: 'Contribute?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        if (!this.book.id) {
          this.patchBook(this.bookForm.value);
        } else {
          this.book.amount = this.bookForm.controls['amount'].value;
        }
        console.log('is valid: ' + this.bookForm.valid);

        if (this.bookForm.valid) {
          if (this.isDefaultImage) {
            this.book.coverImage = '';
          }
          console.log(this.book);
          // if (!this.isDefaultImage) {
          //   this.book.coverImage = this.imagePreview;
          // }
          this.bookEmitter.emit({
            book: this.book,
            image: this.imagePreview
          });

        }
      }
    });


  }

  patchBook(values: any) {
    if (typeof this.book === 'string') {
      this.book = {} as Book;
    }
    Object.assign(this.book, values);
    console.log(values);
    if (this.isNewAuthor) {
      this.book.authorByAuthorId = {
        name: values.author
      };
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.bookForm.controls['coverImage'].setValue(reader.result.split(',')[1]);
        this.imagePreview = reader.result;
      }

    }
  }

  onChangeBook($event) {
    if (typeof $event == 'object') {
      this.book = $event;
      this.imagePreview = $event.coverImage;
    }
  }

  onAddBook($event) {
    if (typeof $event == 'string') {
      this.isNewBook = true;
    }
  }
  onClearBook() {
    this.isLoading = false;
  }
  onChangeAuthor($event) {
    console.log('on change author')
    console.log($event)
    if (typeof $event == 'object') {
      this.book.authorByAuthorId = $event;
    }
  }

  onAddAuthor($event) {
    console.log('on add author')
    console.log($event)
    if (typeof $event == 'string') {
      this.isNewAuthor = true;
    }
  }
  onClearAuthor() {
    this.isLoading = false;
  }
  checkNoImage() {
    console.log('no image');
    this.isDefaultImage = !this.isDefaultImage
  }
}
