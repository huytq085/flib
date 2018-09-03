import {BookService, CartService, ReactService, UserService} from '../../../../../core/services';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../../../../core/models';
import {CartItem} from '../../../../../core/models/cart-item.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {React} from '../../../../../core/models/react.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book = {authorByAuthorId: {}} as Book;
  amount = 1;
  closeResult: string;
  currentRate = 2.5;
  buttonText = 'Submit Review';
  comment = '';
  reacts: React[] = [];

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private cartService: CartService,
              private modalService: NgbModal, private router: Router, private reactService: ReactService,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('Authorization')) {
      this.buttonText = 'Submit Review';
    } else {
      this.buttonText = 'Login to review';
    }
    this.getBook();
  }

  getBook(): any {
    let id;
    /*= +this.activatedRoute.snapshot.paramMap.get('id');*/
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
      this.bookService.getBook(id).subscribe(book => {
        this.book = book;
        this.reactService.getReactsByBookId(this.book.id).subscribe(data => this.reacts = data);
      });
    });
  }

  minus() {
    this.amount -= 1;
  }

  plus() {
    this.amount += 1;
  }

  addToCart(book: Book, amount: number) {
    if (this.cartService.addToCart({book: book, amount: amount} as CartItem)) {
      alert('Add to cart successfully');
    }
  }

  toggleFavorite() {
    // this.userService
  }

  open(content) {
    if (localStorage.getItem('Authorization')) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submitReact() {
    this.reactService.submitReact({
      bookId: this.book.id,
      rating: this.currentRate,
      comment: this.comment
    }).subscribe(data => {
      if (data.userId) {
        this.reactService.getReactsByBookId(this.book.id).subscribe(reacts => this.book.reactionsById = reacts);
      }
    });
  }
}
