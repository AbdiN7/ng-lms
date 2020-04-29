import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { BookCopy } from '../entities/book-copy';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { Book } from '../entities/book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class BookCopyService {
  BookCopyUrl = 'http://localhost:8087/lms/borrower/bookcopy';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('BookLoansService');
  }

  /** GET BookLoans from the server */
  getBookCopy (branchId: number): Observable<BookCopy[]> {
    // this.BookLoanUrl = this.urlWithCardNumber(cardNo);
    //  this.http.get<BookCopy[]>(`${this.BookCopyUrl}/${branchId}`).subscribe( res => console.log("Book Copy GET"))
     return this.http.get<BookCopy[]>(`${this.BookCopyUrl}${branchId}`)
    //   .pipe(
    //     catchError(this.handleError('getBookLoans', []))
    //   );
  }





}
