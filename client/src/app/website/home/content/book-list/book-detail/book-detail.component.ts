import {BookService, CartService, UserService} from '../../../../../core/services';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Book} from '../../../../../core/models';
import {CartItem} from '../../../../../core/models/cart-item.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book = {authorByAuthorId: {}} as Book;
  amount = 1;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private cartService: CartService) {
  }

  ngOnInit() {
    this.getBook();
  }

  getBook(): any {
    let id;
    /*= +this.activatedRoute.snapshot.paramMap.get('id');*/
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
      this.bookService.getBook(id).subscribe(book => this.book = book);
    });
  }

  minus() {
    this.amount -= 1;
  }

  plus() {
    this.amount += 1;
  }

  addToCart(book: Book, amount: number) {
    if (this.cartService.addToCart({book: book, amount: amount} as CartItem)) {
      alert('Add to cart successfully');
    }
  }

  toggleFavorite() {
    // this.userService
  }

}
