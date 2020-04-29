import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BookLoan } from '../entities/book-loan';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { Book } from '../entities/book';
import { Branch } from '../entities/branch';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class BookLoansService {
  BookLoanUrl = 'http://localhost:8087/lms/borrower/bookloan/';
  private handleError: HandleError;
  private _bookloans$ = new BehaviorSubject<BookLoan[]>([]);
  private _ALL_BOOK_LOANS$ = new BehaviorSubject<BookLoan[]>([]);
  private _total$ = new BehaviorSubject<number>(0);


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('BookLoansService');
  }

get bookloans$() { return this._bookloans$.asObservable(); }
get total$() { return this._total$.asObservable(); }
get allbookloans$() { return this._ALL_BOOK_LOANS$.asObservable(); }


  /** GET BookLoans from the server */
  getBookLoans (cardNo: number): Observable<BookLoan[]> {
    // this.BookLoanUrl = this.urlWithCardNumber(cardNo);
    return this.http.get<BookLoan[]>(`${this.BookLoanUrl}${cardNo}`)
      .pipe(
        catchError(this.handleError('getBookLoans', []))
      );
  }

  addBookLoan (book: Book, branch: Branch, cardNo: number): Observable<any> {
    let bLoan: BookLoan;
    const data = {
      'bookLoanKey': {
        book,
        branch,
        'borrower':{
          'cardNo': cardNo
        }
      }
    }
      console.log(data)
     this.http.post<BookLoan>(this.BookLoanUrl, data, httpOptions).subscribe( res => 
      console.log("Add Reached"))
      return 
    // return this.http.post<BookLoan>(this.BookLoanUrl, data, httpOptions)
    //   .pipe(
    //     catchError(this.handleError('addBookLoan', []))
    //   );
  }

  deleteBookLoan (bookloan: BookLoan): Observable<{}> {
    let cardNo = bookloan.bookLoanKey.borrower.cardNo;
    let branchId = bookloan.bookLoanKey.branch.branchId;
    let bookId = bookloan.bookLoanKey.book.bookId;
    return this.http.delete(`${this.BookLoanUrl}/${cardNo}/branch/${branchId}/bookId/${bookId}`, httpOptions)
      .pipe(
        catchError(this.handleError('deleteBookLoan'))
      );
  }
}
