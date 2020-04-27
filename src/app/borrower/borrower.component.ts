import { Component, OnInit } from '@angular/core';
import {BookListComponent} from './book-list/book-list.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BookLoan } from './book-list/bookloan';
import { BookLoansService } from './borrower.service';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  providers: [BookLoansService],
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent implements OnInit {
  BookLoans: BookLoan[];

  constructor(private bookLoansService: BookLoansService)  {}
  ngOnInit(): void {
    if(!this.BookLoans)
    {console.log("nothing to show")}
  }
  
  getLoans(cardNo: number): void
  {
    let crdNumStr = cardNo.toString();
    this.bookLoansService.getBookLoans(crdNumStr)
    .subscribe(bookloans => (this.BookLoans = bookloans) ); 
  }
}
