import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../core/models/book.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() loading: boolean;
  @Input() pagesToShow: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  books: Book[] = [];

  constructor() {
    // console.log(new Book('Book a', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book a', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book b', 'Huy magic', 1.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book c', 'Quang dep trai', 2, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book d', 'Tam 6 mui', 2.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book e', 'Huy magic', 3, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book f', 'Quang dep trai', 3.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book g', 'Tam 6 mui', 4, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book h', 'Huy magic', 4.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book aa', 'Quang dep trai', 5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ab', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ac', 'Huy magic', 1.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ad', 'Quang dep trai', 2, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ae', 'Tam 6 mui', 2.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book af', 'Huy magic', 3, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ag', 'Quang dep trai', 3.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ah', 'Tam 6 mui', 4, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book ba', 'Huy magic', 4.5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book bb', 'Quang dep trai', 5, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
    // this.books.push(new Book('Book bc', 'Tam 6 mui', 1, 'Ngay mai', 'Hom nay', 1, '../../../assets/themes/images/shop/pants/1.jpg'));
  }

  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.count;
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

  ngOnInit(): void {
  }
}
