import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Branch } from '../../entities/branch';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../../directives/sortable-header.directive';

interface SearchResult {
  branches: Branch[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

function matches(branch: Branch, term: string) {
  return branch.branchName.toLowerCase().includes(term.toLowerCase()) 
      || branch.branchAddress.toLowerCase().includes(term.toLowerCase());
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(branches: Branch[], column: SortColumn, direction: string): Branch[] {
  if (direction === '' || column === '') {
    return branches;
  } else {
    return [...branches].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

@Injectable({providedIn: 'root'})
export class BranchHttpService {
  // Effectively a storage array, so i only call the api once and eveyrthing after that is local (ofc excluding create update and delete)
  private _ALL_BRANCHES$ = new BehaviorSubject<Branch[]>([]);
  private _total$ = new BehaviorSubject<number>(0); // total of the above array

  // this is the array which is displayed on the table, its length is <= pageSize
  public _branches$ = new BehaviorSubject<Branch[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();


  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient ) {
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

  getBranches(){
    // Get the branches from the api
    this.http.get<Branch[]>('http://localhost:8100/lms/admin/branch').subscribe(resp => {
      this._ALL_BRANCHES$.next(resp);
    });
  }

  createBranch(branch: Branch){
    this.http.post<Branch>('http://localhost:8100/lms/admin/branch/', {branchName: branch.branchName, branchAddress: branch.branchAddress}, 
                    {"headers" : {'Content-Type':  'application/json'}}).subscribe( res => {
      // add to storage array
      this._ALL_BRANCHES$.getValue().push(res);

      // update the table based on the search
      this._search().subscribe(res => {
        this._branches$.next(res.branches);
        this._total$.next(res.total);
      })
    });
  }

  // DELETE BUTTON
  deleteBranch(branch: Branch){
    this.http.delete('http://localhost:8100/lms/admin/branch/' + branch.branchId).subscribe( res => {
      // remove from storage array
      this._ALL_BRANCHES$.next( 
        this._ALL_BRANCHES$.getValue().filter(ele => {
        return ele.branchId !== branch.branchId
        })
      );

      // update the table based on the search
      this._search().subscribe(res => {
        this._branches$.next(res.branches);
        this._total$.next(res.total);
      })
    });
  }

  updateBranch(branch: Branch){
    const updatedBranch = {
      branchId: null, // must be null for the api to accept
      branchAddress: branch.branchAddress,
      branchName: branch.branchName
    }

    this.http.put('http://localhost:8100/lms/admin/branch/' + branch.branchId, updatedBranch).subscribe( res => {
      // update the storage array
      this._ALL_BRANCHES$.getValue().forEach( ele => {
        if(ele.branchId == branch.branchId){
          ele.branchAddress = branch.branchAddress;
          ele.branchName = branch.branchName;
        }
      });

      // update the array which is bound to the table
      this._branches$.getValue().forEach( ele => {
        if(ele.branchId == branch.branchId){
          ele.branchAddress = branch.branchAddress;
          ele.branchName = branch.branchName;
        }
      });
    });
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
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // filter
    let branches = this._ALL_BRANCHES$.getValue().filter(branch => matches(branch, searchTerm));
    const total = branches.length;
    
    // sort
    branches = sort(branches, sortColumn, sortDirection);

    // paginate
    branches = branches.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({branches, total});
  }
}