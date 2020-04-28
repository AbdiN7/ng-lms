import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibBranchTableComponent } from './lib-branch-table.component';

describe('LibBranchTableComponent', () => {
  let component: LibBranchTableComponent;
  let fixture: ComponentFixture<LibBranchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibBranchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibBranchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
