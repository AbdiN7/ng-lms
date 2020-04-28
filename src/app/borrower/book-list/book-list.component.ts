import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Book} from '../entities/book';
import { Observable } from 'rxjs';
import {NgbdSortableHeader, SortEvent} from '../services/sortable.directive';
import { BooksService } from '../services/book.service';
// import { BookHttpService as BooksService} from '../../common/book-http.service';
import { DecimalPipe } from '@angular/common';


@Component(
  {
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BooksService, DecimalPipe]
})

export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;
  total$: Observable<number>;
  Books: Book[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(public service: BooksService) {
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
    this.service.getBooks()
    .subscribe(book => ( this.Books = book) ); 
    // this.consoleLogBooks();


  }
  logBookButton(e)
  {
    console.log(e)
  }

}
