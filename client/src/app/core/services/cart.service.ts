import {Injectable, OnInit} from '@angular/core';
import {Book, Cart} from '../models';
import {BookService} from './book.service';
import {CartItem} from '../models/cart-item.model';
import {element} from 'protractor';
import {SharedService} from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  books: Book[] = [];
  cart: Cart = {cartItems: {}} as Cart;

  constructor(private bookService: BookService, private sharedService: SharedService) {
    this.cart = JSON.parse(localStorage.getItem('cart')) as Cart;
  }

  ngOnInit(): void {
  }

  addToCart(book: Book): boolean {
    this.cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    let isExist = false;
    if (this.cart) {
      console.log('ko null');
      // cart = JSON.parse(localStorage.getItem('cart')) as Cart;
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const currBook = this.cart.cartItems[i].book;
        if (currBook.id === book.id) {
          this.cart.cartItems[i].amount += 1;
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        this.cart.cartItems.push({book: book, amount: 1});
      }

    } else {
      this.cart.cartItems.push({book: book, amount: 1});
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.sharedService.updateCart(this.cart);
    return true;
  }

  minusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount -= 1;
  }

}
