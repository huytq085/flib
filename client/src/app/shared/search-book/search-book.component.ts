import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BookService } from '../../core/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {

  loading = false;
  books$: Observable<Book[]>;
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.books$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      tap(() => this.loading = true),
      switchMap((term: string) => this.bookService.searchBooks(term).pipe(tap(() => this.loading = false)))
    );
  }

  onChange(book) {
    this.router.navigate([`/book/${book.id}`]);
  }
}
