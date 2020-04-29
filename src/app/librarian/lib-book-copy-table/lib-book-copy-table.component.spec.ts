import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibBookCopyTableComponent } from './lib-book-copy-table.component';

describe('LibBookCopyTableComponent', () => {
  let component: LibBookCopyTableComponent;
  let fixture: ComponentFixture<LibBookCopyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibBookCopyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibBookCopyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
