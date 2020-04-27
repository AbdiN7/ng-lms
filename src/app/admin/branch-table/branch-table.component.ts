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

  ngOnInit(): void {
    console.log("BRANCH TABLE COMPONENT LOADED");
  }

  updateBranch(e){
    console.log("updating");
    console.log(e);
  }

  deleteBranch(branch: Branch){
    this.service.deleteById(branch.branchId);
  }
}
