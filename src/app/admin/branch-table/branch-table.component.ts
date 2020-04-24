import { Component, OnInit } from '@angular/core';
import { AdminHttpService } from 'src/app/common/admin-http.service';

@Component({
  selector: 'app-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.css']
})
export class BranchTableComponent implements OnInit {
  branches: any;
  total: any;
  page: number = 1;
  pageSize: number = 1;
  searchTerm: string = '';

  constructor(private httpService: AdminHttpService) { }

  ngOnInit(): void {
    this.loadAllBranches();
  }

  loadAllBranches() {
    this.httpService.getAll('http://localhost:8100/lms/admin/branch').subscribe(resp => {
      this.branches = resp;
      this.total = this.branches.length;
      console.log("LOAD ALL BRANCHES RESPONSE:");
      console.log(resp);

      console.log("filling with dummy data with ID's >2000 to be big...")
      for(let i = 2000; i<2100; ++i){
        this.branches.push({
          branchId: 1,
          branchName: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          branchAddress: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        });
      }
    });
  }

  searchBranches(){
    throw("implement me!");
  }
}

// https://ng-bootstrap.github.io/#/components/table/examples
// https://ng-bootstrap.github.io/#/components/pagination/overview
// learn how async and observables work overall.