import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BookLoan } from './entities/book-loan';
import { BookLoansService } from './services/book-loan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  providers: [BookLoansService],
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent implements OnInit 
{
  _BookLoans$: Observable<BookLoan[]>
  BookLoans$: BookLoan[]
  total$: Observable<number>

  constructor(private bookLoansService: BookLoansService)  
  {
    this._BookLoans$ = bookLoansService.bookloans$
    this.total$ = bookLoansService.total$;
  }
  ngOnInit(): void {}
  
  getLoans(cardNo: number): void
  {
    console.log(this._BookLoans$)
    this.bookLoansService.getBookLoans(cardNo)
    .subscribe(bookloans => (this.BookLoans$ = bookloans) ); 
  }
  delete(bookloan: BookLoan)
  {
    this.BookLoans$ = this.BookLoans$.filter( bl => bl!= bookloan );
    this.bookLoansService.deleteBookLoan(bookloan).subscribe();

  }
}
