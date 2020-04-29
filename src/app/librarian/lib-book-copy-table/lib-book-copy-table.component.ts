import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LmshttpService } from '../../common/lmshttp.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../../common/pager.service';

@Component({
  selector: 'app-lib-book-copy-table',
  templateUrl: './lib-book-copy-table.component.html',
  styleUrls: ['./lib-book-copy-table.component.css']
})
export class LibBookCopyTableComponent implements OnInit, AfterViewInit {

  constructor(private httpService: LmshttpService, private modalService: NgbModal, private pagerService: PagerService) { }
  bookCopies: any;
  selectedBookCopy: any;
  createdBookCopy: any;
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
    this.createdBookCopy = {
      bookCopyId: {
        bookId: 0,
        branchId: 0
      },
      noOfCopies: 0
    }
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

  openCreate(content){
    console.log("createdbc");
    console.log(this.createdBookCopy);
    this.selectedBookCopy = this.createdBookCopy;
    console.log("Selectedbc");
    console.log(this.selectedBookCopy);
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

  open(content, obj) {
    this.selectedBookCopy = obj;
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

  createBookCopy(){
    let body = {
      "bookCopyKey": {
          "book": {
              "bookId": this.selectedBookCopy.bookCopyId.bookId
          },
          "branch": {
              "branchId": this.selectedBookCopy.bookCopyId.branchId
          }
      },
      "noOfCopies": this.selectedBookCopy.noOfCopies
    }
    console.log("Trying to update...");
    console.log(body);
    this.httpService.postObj('http://localhost:8090/lms/librarian/bookcopy/', body).subscribe(resp => {
      this.loadAllBookCopies();
      this.modalService.dismissAll();
    })
  }

  updateBookCopy(){
    let body = {
      "bookCopyId": {
        "bookId": null,
        "branchId": null
      },
      "noOfCopies": this.selectedBookCopy.noOfCopies
    }
    console.log("Trying to update...");
    console.log(this.selectedBookCopy);
    this.httpService.putObj(`http://localhost:8090/lms/librarian/bookcopy/book/${this.selectedBookCopy.bookCopyKey.book.bookId}/branch/${this.selectedBookCopy.bookCopyKey.branch.branchId}`, body).subscribe(resp => {
      this.loadAllBookCopies();
      this.modalService.dismissAll();
    })
  }

  deleteBookCopy(a){
    console.log("Book to be deleted: ");
    console.log(a.bookCopyKey.book.bookId);
    this.httpService.delete(`http://localhost:8090/lms/librarian/bookcopy/book/${a.bookCopyKey.book.bookId}/branch/${a.bookCopyKey.branch.branchId}`).subscribe(resp => {
      this.loadAllBookCopies();
    })
  }

}

