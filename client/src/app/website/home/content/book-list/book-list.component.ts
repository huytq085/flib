import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { PageBook } from '../../../../core/models/page-book.model';
import { BookService } from '../../../../core/services/book.service';
import { Cart } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[];
  pageBooks: PageBook = {} as PageBook;

  constructor(private bookService: BookService) {
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
    let cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    let isExist = false;
    if (cart) {
      console.log('ko null');
      cart = JSON.parse(localStorage.getItem('cart')) as Cart;
      for (let i = 0; i < cart.cartItems.length; i++) {
        const element = cart.cartItems[i];
        if (element.id === book.id) {
          cart.cartItems[i].amount += 1;
          isExist = true;
        }
      }
      if (!isExist) {
        cart.cartItems.push({ id: book.id, amount: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      // const value = JSON.stringify({ id: book.id, amout: 1 });
      // localStorage.setItem('cart', value);
      // localStorage.setItem()
      console.log('null');
      cart = {
        cartItems: []
      } as Cart;
      cart.cartItems.push({ id: book.id, amount: 1 });
      const cartJSON = JSON.stringify(cart);
      localStorage.setItem('cart', cartJSON);
    }
  }

}
