import { Component, OnInit, PipeTransform } from '@angular/core';
import { BranchHttpService } from 'src/app/common/admin/branch-http.service';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Branch } from 'src/app/common/admin/entities/branch';

@Component({
  selector: 'app-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.css']
})
export class BranchTableComponent implements OnInit {

  branches$: Observable<Branch[]>;
  total$: Observable<number>;

  constructor(public service: BranchHttpService) {
    this.branches$ = service.branches$;
    this.total$ = service.total$;
  }


  ngOnInit(): void {}







  // // pagination
  // total$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // page: number = 1;
  // pageSize: number = 1;

  // searchTerm: string = ''; // filtering
  // branches$: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);

  // constructor(private httpService: BranchHttpService) { }

  // ngOnInit(): void {
  //   this.loadAllBranches();
  // }

  // loadAllBranches() {
  //   console.log("Loading all branches")
  //   this.httpService.getAll('http://localhost:8100/lms/admin/branch').subscribe(res => {
  //     this.branches$.next(res);
  //   });
    
  //   this.branches$.subscribe(res => this.total$.next(res.length));
  // }

  // search(): Branch[] {
  //   console.log("IM HERE");
  //   return this.branches$.getValue().filter(branch => {
  //     const term = this.searchTerm.toLowerCase();
  //     return branch.branchName.toLowerCase().includes(term) || branch.branchAddress.toLocaleLowerCase().includes(term);
  //   });
  // }
}

// https://ng-bootstrap.github.io/#/components/table/examples
// https://ng-bootstrap.github.io/#/components/pagination/overview
// learn how async and observables work overall