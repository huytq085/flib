import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../';


@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private cartSubject = new BehaviorSubject<Cart>({} as Cart);
    public cart = this.cartSubject.asObservable();

    constructor(

    ) {
        this.cartSubject.next(JSON.parse(localStorage.getItem('cart')) as Cart);
    }

    getCart(): Cart {
        return this.cartSubject.value;
    }

    updateCart(cart: Cart) {
        console.log('update cart ne')
        this.cartSubject.next(cart);
    }




}
