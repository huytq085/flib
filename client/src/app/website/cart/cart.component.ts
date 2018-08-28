import {Component, OnInit} from '@angular/core';
import {Cart} from '../../core/models/cart.model';
import {BookService} from '../../core/services/book.service';
import {Book} from '../../core/models/book.model';
import {CartItem} from '../../core/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {} as Cart;
  books: Book[] = [];

  constructor(private bookService: BookService, ) {
    this.cart = JSON.parse(localStorage.getItem('cart')) as Cart;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.cart) {
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const element = this.cart.cartItems[i];
        this.bookService.getBook(element.id).subscribe(data => this.books.push(data));
      }
    }
  }

  minusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount -= 1;
  }

  plusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount += 1;
  }

  remove(item: CartItem) {
    this.cart.cartItems.splice(this.cart.cartItems.indexOf(item), 1);
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  sendTicket() {

  }
}
