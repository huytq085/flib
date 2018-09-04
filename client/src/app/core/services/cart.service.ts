import {Injectable, OnInit} from '@angular/core';
import {Book, Cart} from '../models';
import {BookService} from './book.service';
import {CartItem} from '../models/cart-item.model';
import {SharedService} from './shared.service';
import {TokenStorage} from '../../website/auth/authority/token.storage';
import {TicketService} from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  books: Book[] = [];
  cart: Cart = {cartItems: {}} as Cart;

  constructor(private bookService: BookService,
              private ticketService: TicketService,
              private tokenStorage: TokenStorage,
              private sharedService: SharedService) {
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
          this.cart.cartItems[i].amount += item.amount;
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        this.cart.cartItems.push(item);
      }
    } else {
      this.cart = {cartItems: []} as Cart;
      this.cart.cartItems.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.sharedService.updateCart(this.cart);
    return true;
  }

  minusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount -= 1;
  }

  remove(index: number) {
    this.cart.cartItems.splice(index, 1);
    if (this.cart) {
      this.books = [];
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const book = this.cart.cartItems[i].book;
        this.bookService.getBook(book.id).subscribe(data => this.books.push(data));
      }
    }
  }

  sendTicket() {
    if (this.tokenStorage.loggedIn()) {
      const cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;
      this.ticketService.createTicket(cart).subscribe(data => {
        console.log(data);
        this.cart = {} as Cart;
        localStorage.removeItem('cart');
      });
    }
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    if (this.cart) {
      this.books = [];
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const book = this.cart.cartItems[i].book;
        this.bookService.getBook(book.id).subscribe(data => this.books.push(data));
      }
    }
    this.sharedService.updateCart(this.cart);
  }
}
