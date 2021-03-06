import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LmshttpService } from '../../common/lmshttp.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../../common/pager.service';

@Component({
  selector: 'app-lib-branch-table',
  templateUrl: './lib-branch-table.component.html',
  styleUrls: ['./lib-branch-table.component.css']
})
export class LibBranchTableComponent implements OnInit {

  constructor(private httpService: LmshttpService, private modalService: NgbModal, private pagerService: PagerService) { }
  branches: any;
  selectedBranch: any;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalBranches = 0;
  today = new Date();
  pager: any = {};
  pagedItems: any[];
  searchString = '';
  ngOnInit(): void {
    this.loadAllBranches();
  }

  ngAfterViewInit() {
    console.log('after view is loaded.')
  }

  loadAllBranches() {
    this.httpService.getAll('http://localhost:8090/lms/librarian/branches').subscribe(resp => {
      this.branches = resp;
      this.totalBranches = this.branches.length;
      this.setPage(1);
    })
  }

  open(content, obj) {
    this.selectedBranch = obj;
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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.branches.length, page, 10);
    this.pagedItems = this.branches.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1,
    );
  }

  // deleteAuthor(a){
  //   let author = {
  //     authorId: a.authorId
  //   }
  //   this.httpService.postObj('http://localhost:8090/lms/updateAuthor', author).subscribe(resp => {
  //     this.loadAllAuthors();
  //   })
  // }

  updateBranch(){
    let body = {
      "branchId": null,
      "branchName": this.selectedBranch.branchName,
      "branchAddress": this.selectedBranch.branchAddress
  }
    console.log("Trying to update...");
    console.log(this.selectedBranch);
    this.httpService.putObj(`http://localhost:8090/lms/librarian/branch/${this.selectedBranch.branchId}`, body).subscribe(resp => {
      this.loadAllBranches();
      this.modalService.dismissAll();
    })
  }

  searchBranches(){
    this.httpService.getAll(`http://localhost:8090/lms/librarian/branch/name/${this.searchString}`).subscribe(resp => {
      this.branches = resp;
      this.totalBranches = this.branches.length;
      this.setPage(1);
    })
  }
}