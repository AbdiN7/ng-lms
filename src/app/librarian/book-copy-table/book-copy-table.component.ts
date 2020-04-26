import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LmshttpService } from '../../common/lmshttp.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../../common/pager.service';

@Component({
  selector: 'app-book-copy-table',
  templateUrl: './book-copy-table.component.html',
  styleUrls: ['./book-copy-table.component.css']
})
export class BookCopyTableComponent implements OnInit, AfterViewInit {

  constructor(private httpService: LmshttpService, private modalService: NgbModal, private pagerService: PagerService) { }
  bookCopies: any;
  selectedBookCopies: any;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalBookCopies = 0;
  today = new Date();
  pager: any = {};
  pagedItems: any[];
  searchString = '';
  ngOnInit() {
    this.loadAllBookCopies();
  }

  ngAfterViewInit() {
    console.log('after view is loaded.');
  }

  loadAllBookCopies() {
    console.log("LOADING ALL BOOK COpies");
    this.httpService.getAll('http://localhost:8090/lms/librarian/bookcopies').subscribe(resp => {
      this.bookCopies = resp;
      console.log(this.bookCopies);
      this.totalBookCopies = this.bookCopies.length;
      this.setPage(1);
    })
  }

  open(content, obj) {
    this.selectedBookCopies = obj;
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
    console.log(this.bookCopies);
    this.pager = this.pagerService.getPager(this.bookCopies.length, page, 10);
    this.pagedItems = this.bookCopies.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1,
    );
  }

  searchBookCopies(){
    console.log(this.searchString);
    this.httpService.getAll(`http://localhost:8090/lms/librarian/bookcopy/branch/${this.searchString}`).subscribe(resp => {
      this.bookCopies = resp;
      this.totalBookCopies = this.bookCopies.length;
      this.setPage(1);
    })
  }

  // deleteBooks(a){
  //   this.httpService.delete(`http://localhost:8090/lms/librarian/book/title/${this.searchString}`).subscribe(resp => {
  //     this.books = resp;
  //     this.totalBooks = this.books.length;
  //     this.setPage(1);
  //   })
  // }
}

