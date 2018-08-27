import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      converImage: '',
      name: '',
      description: '',
      author: '',
      amount: ''
    });
  }

  ngOnInit() {
  }

}
