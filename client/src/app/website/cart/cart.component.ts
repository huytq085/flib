import { Component, OnInit } from '@angular/core';
import { Cart } from '../../core/models';
import { BookService } from '../../core/services';
import { CartItem } from '../../core/models/cart-item.model';
import { TokenStorage } from '../auth/authority/token.storage';
import { TicketService } from '../../core/services';
import { Book, CartService, SharedService } from '../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { cartItems: [] } as Cart;

  constructor(
    private bookService: BookService,
    private tokenStorage: TokenStorage,
    private ticketService: TicketService,
    private sharedService: SharedService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cart = this.cartService.cart;
    // console.log(this.cart.cartItems)
  }

  ngOnInit() {
  }

  plusAmount(item: CartItem) {
    this.cart.cartItems[this.cart.cartItems.indexOf(item)].amount += 1;
  }

  remove(index: number) {
    this.cartService.remove(index);
  }

  updateCart() {
    this.cartService.updateCart();
  }

  sendTicket() {
    if (localStorage.getItem('Authorization')) {
      this.cartService.sendTicket();
    } else {
      this.router.navigateByUrl('/login?back=/cart');
    }
  }
}
