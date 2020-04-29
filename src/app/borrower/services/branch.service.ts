import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Branch } from '../entities/branch';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class BranchService {
  BranchUrl = 'http://localhost:8087/lms/borrower/branch/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('BookLoansService');
  }

  /** GET BookLoans from the server */
  getBranches (): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.BranchUrl}`)
      .pipe(
        catchError(this.handleError('getBookLoans', []))
      );
  }

}
