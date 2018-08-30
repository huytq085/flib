import { BookService } from './../../../core/services/book.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Book } from '../../../core/models/book.model';
import { UserService, Profile } from '../../../core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { Subject, Observable, concat, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

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
  bookInput$ = new Subject<string>();
  imagePreview;
  bookObservable$: Observable<Book[]>;
  isNew = false;

  @Output() bookEmitter = new EventEmitter<Book>();
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
      amount: ''
    });
  }

  ngOnInit() {
    this.bookObservable$ = concat(
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

  submitForm() {
    // this.isSubmitting = true;
    // update the model
    if (!this.book.id){
      this.patchBook(this.bookForm.value);
    } else {
      this.book.amount = this.bookForm.controls['amount'].value;
    }
    console.log(this.book)
    
    this.userService.contribute(this.book).subscribe(
      data => {
        this.isSubmitting = false;
        this.book.id = data.bookId;
        // Set book image to base64 to display in contribute list
        this.book.coverImage = this.imagePreview;
        this.bookEmitter.emit(this.book);
      }
    )

  }

  patchBook(values: any) {
    Object.assign(this.book, values);
    console.log(values)
    this.book.authorByAuthorId = {
      name: values.author
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

  onChange($event){
    this.book = $event;
  }

  onAdd($event){
    console.log($event);
    this.isNew = true;
    
  }
  onClear(){
    this.isLoading = false;
  }

}
