import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail-book',
  templateUrl: './user-detail-book.component.html',
  styleUrls: ['./user-detail-book.component.css']
})
export class UserDetailBookComponent implements OnInit {

  books: Book[] = new Array();
  userId: number;

  currentPage: number = 0;
  totalPages: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.userId = +params["id"];
      this.loadBooks();
    });
  }
  loadBooks() {
    let pageConfig = {
      page: this.currentPage,
      size: 5
    }
    this.userService.getBooksByUserId(this.userId, pageConfig).subscribe(
      data => {
        this.books = data['content'];
        this.totalPages = data['totalPages'];
      }
    )
  }
  setPage(i){
    this.currentPage = i;
    this.loadBooks();
  }
  take(book: Book, index) {
    swal({
      title: 'Take this book',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.userService.takeBook(this.userId, book.id).subscribe(
          data => {
            if (data) {
              this.books.slice(index, 1);
              swal({
                type: 'success',
                title: 'Successful',
              })
            }
          }
        )
      }
    })

  }

}
