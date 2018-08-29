import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../../website/auth/authority/token.storage';
import { Cart } from '../../../core/models/cart.model';
import { SharedService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart = {} as Cart;

  constructor(
    private tokenStorage: TokenStorage,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.cart.subscribe(
      data => {
        this.cart = data;
      }
    )
  }

}
