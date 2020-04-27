import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borrower-table',
  templateUrl: './borrower-table.component.html',
  styleUrls: ['./borrower-table.component.css']
})
export class BorrowerTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("BORROWER TABLE COMPONENT LOADED");
  }

}
