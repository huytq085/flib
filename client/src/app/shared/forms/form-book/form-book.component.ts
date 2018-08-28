import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Book} from '../../../core/models/book.model';
import {UserService, Profile} from '../../../core';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {
  bookForm: FormGroup;
  isSubmitting = false;
  book: Book = {} as Book;
  @Output() bookEmitter = new EventEmitter<Book>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.bookForm = this.fb.group({
      coverImage: null,
      name: '',
      description: '',
      author: '',
      amount: ''
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    // update the model
    this.patchBook(this.bookForm.value);
    this.userService.contribute(this.book).subscribe(
      data => {
        console.log(data);
        this.isSubmitting = false;
        this.book.id = data.bookId;
        this.bookEmitter.emit(this.book);
      }
    );
  }

  patchBook(values: any) {
    Object.assign(this.book, values);
    this.book.authorByAuthorId = {
      name: values.author
    };
  }


}
