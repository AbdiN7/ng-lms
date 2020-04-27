import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { book} from '../entities/book';
import { Observable } from 'rxjs';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { bookService } from './book.service';
import { DecimalPipe } from '@angular/common';


@Component(
  {
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [bookService, DecimalPipe]
})

export class BookListComponent implements OnInit {
  books$: Observable<book[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(public service: bookService) {
    this.books$ = service.books$;
    this.total$ =  service.total$;
   }

   onSort({column, direction}: SortEvent)
   {
     this.headers.forEach(header => {
       if(header.sortable !== column)
       {header.direction = '';
      }
     });
     this.service.sortColumn = column;
     this.service.sortDirection = direction;
   }
  ngOnInit(): void {
  }

}
