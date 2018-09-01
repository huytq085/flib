import {Component, OnInit} from '@angular/core';
import {Cart} from '../../core/models/cart.model';
import {BookService} from '../../core/services/book.service';
import {CartItem} from '../../core/models/cart-item.model';
import {TokenStorage} from '../auth/authority/token.storage';
import {TicketService} from '../../core/services/ticket.service';
import {CartService, SharedService} from '../../core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {cartItems: []} as Cart;

  constructor(
    private bookService: BookService,
    private tokenStorage: TokenStorage,
    private ticketService: TicketService,
    private sharedService: SharedService,
    private cartService: CartService
  ) {
    this.cart = this.cartService.cart;
    // console.log(this.cart.cartItems)
  }

  ngOnInit() {
    // this.init();
  }

  // init() {
  //   if (this.cart) {
  //     for (let i = 0; i < this.cart.books.length; i++) {
  //       const element = this.cart.books[i];
  //       this.bookService.getBook(element.id)
  //         .subscribe(data => {
  //           this.books.push(data);
  //           console.log(this.books);
  //           console.log(this.cart.books);
  //         });
  //     }
  //   }
  // }


  plusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount += 1;
  }

  // remove(index: number) {
  //   this.cart.cartItems.splice(index, 1);
  //   if (this.cart) {
  //     this.books = [];
  //     for (let i = 0; i < this.cart.cartItems.length; i++) {
  //       const element = this.cart.cartItems[i];
  //       this.bookService.getBook(element.id).subscribe(data => this.books.push(data));
  //     }
  //   }
  // }

  // updateCart() {
  //   localStorage.setItem('cart', JSON.stringify(this.cart));
  //   if (this.cart) {
  //     this.books = [];
  //     for (let i = 0; i < this.cart.cartItems.length; i++) {
  //       const element = this.cart.cartItems[i];
  //       this.bookService.getBook(element.id).subscribe(data => this.books.push(data));
  //     }
  //   }
  //   this.sharedService.updateCart(this.cart);
  // }
  //
  // sendTicket() {
  //   if (this.tokenStorage.loggedIn()) {
  //     const cart: Cart = JSON.parse(localStorage.getItem('cart')) as Cart;
  //     // const ticket: Ticket = {ticketDetailsById: ticketDetail, dateAdded: new Date().toDateString()};
  //     this.ticketService.createTicket(cart).subscribe(data => {
  //       console.log(data);
  //       this.cart = {} as Cart;
  //       localStorage.removeItem('cart');
  //     });
  //   }
  // }
}
