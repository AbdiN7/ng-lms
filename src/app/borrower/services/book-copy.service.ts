import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, delay, switchMap, tap} from 'rxjs/operators';

import { Book } from '../entities/book';
import {SortColumn, SortDirection} from '../services/sortable.directive';
import { DecimalPipe } from '@angular/common';

import { BookCopy } from '../entities/book-copy';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
let myBooks; 
interface SearchResult {
    bookcopies: BookCopy[];
    total: number;
  }
  
  interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
  }
  function matches(bookcopy: BookCopy, term: string) {
    return bookcopy.bookCopyKey.book.title.toLowerCase().includes(term.toLowerCase()) 
    || bookcopy.bookCopyKey.book.author.authorName.toLowerCase().includes(term.toLowerCase())
    || bookcopy.bookCopyKey.book.publisher.publisherName.toLowerCase().includes(term.toLowerCase());

  }
  const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  
  function sort(bookcopies: BookCopy[], column: SortColumn, direction: string): BookCopy[] {
    
    if (direction === '' || column === '') {
      return bookcopies;
    } else {
      return [...bookcopies].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

@Injectable()
export class BookCopyService {
  BookCopyUrl = 'http://localhost:8087/lms/borrower/bookcopy';
  BookUrl = 'http://localhost:8087/lms/borrower/book/';
  private handleError: HandleError;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _bookcopy$ = new BehaviorSubject<BookCopy[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler, 
    private pipe: DecimalPipe) {
    this.handleError = httpErrorHandler.createHandleError('BooksService');
    
  }
  get bookcopies$() { return this._bookcopy$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  
  private _search(): Observable<SearchResult> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      
      let bookcopies = sort(myBooks, sortColumn, sortDirection);
      // 2. filter
      bookcopies = bookcopies.filter(bookcopy => matches(bookcopy, searchTerm));
      const total = bookcopies.length;
  
      // 3. paginate
      bookcopies = bookcopies.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({bookcopies, total});
    }
  
  /** GET BookLoans from the server */
  getBookCopy (branchId: number): Observable<BookCopy[]> {
     return this.http.get<BookCopy[]>(`${this.BookCopyUrl}${branchId}`)

  }
  getBooksById(branchId) {
    this.http.get<BookCopy[]>(`http://localhost:8087/lms/borrower/bookcopy/${branchId}`).subscribe(resp => {
      this._bookcopy$.next(resp);
      myBooks = this._bookcopy$.value;
    });
        if(this._bookcopy$.value)
        {
          this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            
            tap(() => this._loading$.next(false))
          ).subscribe(result => {
            this._bookcopy$.next(result.bookcopies);
            this._total$.next(result.total);
          });
        this._search$.next();
        }
      }

  /** GET Books from the server */
  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.BookUrl)
      .pipe(
        catchError(this.handleError('getBooks', []))
      );
  }

}
