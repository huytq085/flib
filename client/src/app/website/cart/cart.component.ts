import {Component, OnInit} from '@angular/core';
import {Cart} from '../../core/models/cart.model';
import {BookService} from '../../core/services/book.service';
import {Book} from '../../core/models/book.model';
import {CartItem} from '../../core/models/cart-item.model';
import {TokenStorage} from '../auth/authority/token.storage';
import {TicketService} from '../../core/services/ticket.service';
import {TicketDetail} from '../../core/models/ticket-detail.model';
import {Ticket} from '../../core/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {} as Cart;
  books: Book[] = [];

  constructor(private bookService: BookService, private tokenStorage: TokenStorage, private ticketService: TicketService) {
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
    if (this.cart) {
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const element = this.cart.cartItems[i];
        this.bookService.getBook(element.id).subscribe(data => this.books.push(data));
      }
    }
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    if (this.cart) {
      for (let i = 0; i < this.cart.cartItems.length; i++) {
        const element = this.cart.cartItems[i];
        this.bookService.getBook(element.id).subscribe(data => this.books.push(data));
      }
    }
  }

  sendTicket() {
    if (this.tokenStorage.loggedIn()) {
      const cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;
      // const ticket: Ticket = {ticketDetailsById: ticketDetail, dateAdded: new Date().toDateString()};
      this.ticketService.createTicket(cart).subscribe(data => console.log(data));
    }
  }
}
