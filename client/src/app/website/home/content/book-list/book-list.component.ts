import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../../core/models/book.model';
import {PageBook} from '../../../../core/models/page-book.model';
import {BookService, CartService} from '../../../../core/services';
import {Cart} from '../../../../core/models';
import {BookListService, SharedService} from '../../../../core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[];

  // pageBooks: PageBook = {} as PageBook;

  constructor(
    private bookService: BookService,
    private sharedService: SharedService,
    private cartService: CartService
    // private bookListService: BookListService
  ) {
  }


  ngOnInit(): void {

    this.bookService.getBookByPage(0, 9).subscribe((data: PageBook) => {
      this.books = data.content;
      console.log(data);

    });
  }

  onChoose(books: Book[]) {
    this.books = books;
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  addToCart(book: Book) {
    // let cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    // let isExist = false;
    // if (cart) {
    //   console.log('ko null');
    //   cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    //   for (let i = 0; i < cart.cartItems.length; i++) {
    //     const element = cart.cartItems[i];
    //     if (element.book.id === book.id) {
    //       cart.cartItems[i].amount += 1;
    //       isExist = true;
    //     }
    //   }
    //   if (!isExist) {
    //     cart.cartItems.push({id: book.id, amount: 1});
    //   }
    //   localStorage.setItem('cart', JSON.stringify(cart));
    //   this.sharedService.updateCart(cart);
    // } else {
    //   // const value = JSON.stringify({ id: book.id, amout: 1 });
    //   // localStorage.setItem('cart', value);
    //   // localStorage.setItem()
    //   console.log('null');
    //   cart = {
    //     cartItems: []
    //   } as Cart;
    //   cart.cartItems.push({id: book.id, amount: 1});
    //   const cartJSON = JSON.stringify(cart);
    //   localStorage.setItem('cart', cartJSON);
    // }
    if (this.cartService.addToCart(book)) {
      alert('Add to cart successfully');
    }
  }
}
