import {Injectable, OnInit} from '@angular/core';
import {Book, Cart} from '../models';
import {BookService} from './book.service';
import {CartItem} from '../models/cart-item.model';
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

  addToCart(item: CartItem): boolean {
    this.cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    let isExist = false;
    if (this.cart) {
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const currBook = this.cart.cartItems[i].book;
        if (currBook.id === item.book.id) {
          this.cart.cartItems[i].amount += 1;
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        this.cart.cartItems.push(item);
      }
    } else {
      this.cart = {cartItems: {}} as Cart;
      this.cart.cartItems.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.sharedService.updateCart(this.cart);
    return true;
  }

  minusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount -= 1;
  }


}
