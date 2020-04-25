import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LmshttpService } from '../../common/lmshttp.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../../common/pager.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit, AfterViewInit {

  constructor(private httpService: LmshttpService, private modalService: NgbModal, private pagerService: PagerService) { }
  books: any;
  selectedBook: any;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalBooks = 0;
  today = new Date();
  pager: any = {};
  pagedItems: any[];
  searchString = '';
  ngOnInit(): void {
    this.loadAllBooks();
  }

  ngAfterViewInit() {
    console.log('after view is loaded.')
  }

  loadAllBooks() {
    this.httpService.getAll('http://localhost:8090/lms/librarian/books').subscribe(resp => {
      this.books = resp;
      this.totalBooks = this.books.length;
      this.setPage(1);
    })
  }

  open(content, obj) {
    this.selectedBook = obj;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      result => {
        this.errMsg = '';
        this.closeResult = `Closed with ${result}`;
      },
      reason => {
        this.errMsg = '';
        this.closeResult = `Dismissed`
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.books.length, page, 10);
    this.pagedItems = this.books.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1,
    );
  }

  searchBooks(){
    this.httpService.getAll(`http://localhost:8090/lms/book/${this.searchString}`).subscribe(resp => {
      this.books = resp;
      this.totalBooks = this.books.length;
      this.setPage(1);
    })
  }
}
