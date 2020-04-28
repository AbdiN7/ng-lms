import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibBookTableComponent } from './lib-book-table.component';

describe('LibBookTableComponent', () => {
  let component: LibBookTableComponent;
  let fixture: ComponentFixture<LibBookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibBookTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
