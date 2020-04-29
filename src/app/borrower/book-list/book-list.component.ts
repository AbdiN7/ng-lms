import { Component, OnInit, ViewChildren, QueryList, ApplicationRef } from '@angular/core';
import { Book} from '../entities/book';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import {NgbdSortableHeader, SortEvent} from '../services/sortable.directive';
import { BooksService } from '../services/book.service';
import { BookCopyService } from '../services/book-copy.service';
import { BranchService } from '../services/branch.service';
// import { BookHttpService as BooksService} from '../../common/book-http.service';
import { DecimalPipe } from '@angular/common';
import { BookCopy } from '../entities/book-copy';
import { Branch } from '../entities/branch';
import { BookLoansService } from '../services/book-loan.service';
import { BookLoan } from '../entities/book-loan';
import { skip } from 'rxjs/operators';
import { tick } from '@angular/core/testing';


@Component(
  {
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BooksService, DecimalPipe, BookCopyService, BranchService, BookLoansService ]
})

export class BookListComponent implements OnInit {
  bookcopies$: Observable<BookCopy[]>;
  total$: Observable<number>;
  Books: Book[];
  BookCopy: BookCopy;
  Branches: Branch[];
  BookLoans: BookLoan[];
  currBranch: Branch;
  currBook: Book;
  Loan: any;
  cardNo: any;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(
    public service: BooksService, 
    public bookCopyService: BookCopyService, 
    public branchService: BranchService,
    public bookLoanService: BookLoansService,
    private router: Router) {
    this.bookcopies$ = service.bookcopies$;
    this.total$ =  service.total$;
    
    
   }

   onSort({column, direction}: SortEvent)
   {
     this.headers.forEach(header => {
       if(header.sortable !== column)
       {header.direction = '';
      }
     });
     this.service.sortColumn = column;
     this.service.sortDirection = direction;
   }
  ngOnInit(): void {
    let mybooks = this.service.getBooks()
    .subscribe(book => ( this.Books = book) ); 

    // this.consoleLogBooks();
    // this.copyService.getBookCopy();
    this.branchService.getBranches()
    .subscribe(branch => (this.Branches = branch));


  }
  
  logBookButton(e : BookCopy)
  {

    this.currBook = e.bookCopyKey.book;
    this.bookLoanService.addBookLoan(this.currBook, this.currBranch , this.cardNo)
    this.router.navigate(['/lms/borrower'])
  }
  logBranch(e: Branch)
  {
    this.currBranch = e;
    this.service.getBooksById(e.branchId);
  }
  getBorrower(cardNo: number) : void
  {
    this.cardNo = cardNo;
    this.bookLoanService.getBookLoans(cardNo)
    .subscribe(bookloans => (this.BookLoans = bookloans) ); 
  }
  borrower(): string
  {
    return this.cardNo
  }



}
