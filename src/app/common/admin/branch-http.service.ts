import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Branch } from './entities/branch';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  branches: Branch[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

function matches(branch: Branch, term: string) {
  return branch.branchName.toLowerCase().includes(term.toLowerCase()) 
      || branch.branchAddress.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class BranchHttpService {
  private _ALL_BRANCHES$ = new BehaviorSubject<Branch[]>([]);

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _branches$ = new BehaviorSubject<Branch[]>([]);
  private _total$ = new BehaviorSubject<number>(0);


  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
  };

  constructor(private http: HttpClient ) {
    // Get the branches from the api
    this.http.get<Branch[]>('http://localhost:8100/lms/admin/branch').subscribe(resp => {
      this._ALL_BRANCHES$.next(resp);

      console.log("filling with dummy data with ID's >2000 to be big...")
      for(let i = 2000; i<2100; ++i){
        this._ALL_BRANCHES$.getValue().push({
          branchId: i,
          branchName: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          branchAddress: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        });
      }

    });

    this._search$.pipe(
      tap(() => this._loading$.next(true)), // set loading to true
      debounceTime(200),                    // for 200ms, only emit if the api responds within 200ms (effectively)
      switchMap(() => this._search()),
      tap(() => this._loading$.next(false)) // set laoding to false
    ).subscribe(result => {                 // when searching is complete set _branches$ to the result of the search, update the total as well
      this._branches$.next(result.branches);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  // GETTERS
  get branches$() { return this._branches$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // SETTERS
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {pageSize, page, searchTerm} = this._state;

    // filter
    let branches = this._ALL_BRANCHES$.getValue().filter(branch => matches(branch, searchTerm));
    const total = branches.length;

    // paginate
    branches = branches.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({branches, total});
  }
}