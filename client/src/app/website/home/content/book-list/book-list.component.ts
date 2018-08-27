import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { PageBook } from '../../../../core/models/page-book.model';
import { BookService } from '../../../../core/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[];
  pageBooks: PageBook = {} as PageBook;

  constructor(private bookService: BookService) {
    // console.log(new Book('Book a', 'Tam 6 mui', 1, 'Ngay mai
    // ', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book a', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book b', 'Huy magic', 1.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book c', 'Quang dep trai', 2, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book d', 'Tam 6 mui', 2.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book e', 'Huy magic', 3, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book f', 'Quang dep trai', 3.5, '
    // Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book g', 'Tam 6 mui', 4, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book h', 'Huy magic', 4.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book aa', 'Quang dep trai', 5,
    // 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ab', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ac', 'Huy magic', 1.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ad', 'Quang dep trai',
    // 2, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ae', 'Tam 6 mui', 2.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book af', 'Huy magic', 3, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ag', 'Quang dep trai', 3.5, 'N
    // gay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ah', 'Tam 6 mui', 4, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ba', 'Huy magic', 4.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book bb', 'Quang dep trai', 5, 'Ng
    // ay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book bc', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
  }


  ngOnInit(): void {
    this.bookService.getBookByPage(1, 5).subscribe((data: PageBook) => {
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
}
