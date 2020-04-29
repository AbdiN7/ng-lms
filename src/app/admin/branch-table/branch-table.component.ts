import { Component, OnInit, PipeTransform, ApplicationRef } from '@angular/core';
import { BranchHttpService } from 'src/app/common/admin/branch-http.service';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Branch } from 'src/app/common/admin/entities/branch';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.css']
})
export class BranchTableComponent implements OnInit {
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
