import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.css']
})
export class AuthorTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("AUTHOR TABLE COMPONENT LOADED");
  }

}
