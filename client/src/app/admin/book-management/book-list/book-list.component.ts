import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../core/services';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../../core/models';
import {PageBook} from '../../../core/models/page-book.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  pageBook: PageBook;
  isAdd = false;
  modalRef: NgbModalRef;
  closeResult: string;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const number = params['number'];
      this.bookService.getBookByPage(number, 12).subscribe(pageBook => {
        this.pageBook = pageBook;
      });
    });
  }

  preDelete(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {

    }, (reason) => {

    });

  }

  delete(book: Book) {
    this.bookService.deleteBook(book).subscribe(data => {
      console.log(data);
      const number = +this.activatedRoute.snapshot.paramMap.get('number');
      this.bookService.getBookByPage(number, 12).subscribe(pageBook => {
        this.pageBook = pageBook;
      });
    });
    this.modalRef.close();
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
}
