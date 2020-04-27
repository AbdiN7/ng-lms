import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {book} from '../entities/book';
import {Books} from '../entities/books';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';

interface SearchResult {
  books: book[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(books: book[], column: SortColumn, direction: string): book[] {
  if (direction === '' || column === '') {
    return books;
  } else {
    return [...books].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(book: book, term: string, pipe: PipeTransform) {
  return book.name.toLowerCase().includes(term.toLowerCase())
    // || pipe.transform(book.author).includes(term)
    // || pipe.transform(book.lib).includes(term);
}

@Injectable({providedIn: 'root'})
export class bookService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _books$ = new BehaviorSubject<book[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._books$.next(result.books);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get books$() { return this._books$.asObservable(); }
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

    // 1. sort
    let books = sort(Books, sortColumn, sortDirection);

    // 2. filter
    books = books.filter(book => matches(book, searchTerm, this.pipe));
    const total = books.length;

    // 3. paginate
    books = books.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({books, total});
  }
}