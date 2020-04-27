import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BookLoan } from './book-list/bookloan';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class BookLoansService {
  BookLoanUrl = 'http://localhost:8087/lms/borrower/bookloan/';
  private handleError: HandleError;

  urlWithCardNumber (cardNo: string) : string
  {
    let newUrl =`http://localhost:8087/lms/borrower/bookloan/${cardNo}`;
    return newUrl;
  }
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('BookLoansService');
  }

  /** GET BookLoans from the server */
  getBookLoans (cardNo: string): Observable<BookLoan[]> {
    this.BookLoanUrl = this.urlWithCardNumber(cardNo);
    return this.http.get<BookLoan[]>(this.BookLoanUrl)
      .pipe(
        catchError(this.handleError('getBookLoans', []))
      );
  }

  searchBookLoans(term: string): Observable<BookLoan[]> {
    
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('cardNo', term) } : {};

    return this.http.get<BookLoan[]>(this.BookLoanUrl, options)
      .pipe(
        catchError(this.handleError<BookLoan[]>('searchBookLoans', []))
      );
  }

  addBookLoan (BookLoan: BookLoan): Observable<BookLoan> {
    return this.http.post<BookLoan>(this.BookLoanUrl, BookLoan, httpOptions)
      .pipe(
        catchError(this.handleError('addBookLoan', BookLoan))
      );
  }

  // deleteBookLoan (id: number): Observable<{}> {
  //   const url = `${this.BookLoanUrl}/${id}`;
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteBookLoan'))
  //     );
  // }
}
