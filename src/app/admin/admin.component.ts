import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  active = 'Branches';

  constructor() { }

  ngOnInit(): void {
    console.log("PUBLISHER TABLE COMPONENT LOADED");
  }

}
