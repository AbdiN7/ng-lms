import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCopyTableComponent } from './book-copy-table.component';

describe('BookCopyTableComponent', () => {
  let component: BookCopyTableComponent;
  let fixture: ComponentFixture<BookCopyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCopyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCopyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
