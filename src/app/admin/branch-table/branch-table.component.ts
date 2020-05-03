import { Component, OnInit, PipeTransform, ApplicationRef, ViewChildren, QueryList } from '@angular/core';
import { BranchHttpService } from 'src/app/admin/services/branch-http/branch-http.service';
import { FormControl } from '@angular/forms';
import { SortEvent } from '../directives/sortable-header.directive';
import { Observable, BehaviorSubject } from 'rxjs';
import { Branch } from 'src/app/admin/entities/branch';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortableHeaderDirective } from '../directives/sortable-header.directive';

@Component({
  selector: 'app-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.css']
})
export class BranchTableComponent implements OnInit {

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  
  // data
  branches$: Observable<Branch[]>;
  total$: Observable<number>;
  // modal vars
  private modalRef: NgbModalRef;
  errMsg: string;
  closeResult: string;
  selectedBranch: Branch;
  createdBranch: Branch = {
    branchId: null,
    branchAddress: null,
    branchName: null
  };

  constructor(public service: BranchHttpService,private modalService: NgbModal) {
    this.branches$ = service.branches$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    console.log("BRANCH TABLE COMPONENT LOADED");
    this.service.getBranches();
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  createBranch(branch: Branch){
    this.service.createBranch(branch);
    this.modalService.dismissAll();
    // reset the createdBranch obj
    this.createdBranch = {
      branchId: null,
      branchAddress: null,
      branchName: null
    };
  }

  updateBranch(branch: Branch){
    this.service.updateBranch(branch);
    this.modalService.dismissAll();
  }

  deleteBranch(branch: Branch){
    this.service.deleteBranch(branch);
  }

  openUpdateModal(content, branch) {
    this.selectedBranch = branch;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      result => {
        this.errMsg = '';
        this.closeResult = `Closed with ${result}`;
      },
      reason => {
        this.errMsg = '';
        this.closeResult = `Dismissed`
      }
    )
  }

  openCreateModal(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      result => {
        this.errMsg = '';
        this.closeResult = `Closed with ${result}`;
      },
      reason => {
        this.errMsg = '';
        this.closeResult = `Dismissed`
      }
    )
  }
}
