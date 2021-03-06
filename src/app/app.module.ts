import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { LibBranchTableComponent } from './librarian/lib-branch-table/lib-branch-table.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { LmshttpService } from './common/lmshttp.service';
import { LmsSortPipe } from './common/pipes/lms-sort.pipe';
import { PagerService } from './common/pager.service';
import { LibBookTableComponent } from './librarian/lib-book-table/lib-book-table.component';
import { LibBookCopyTableComponent } from './librarian/lib-book-copy-table/lib-book-copy-table.component';
import { BranchTableComponent } from './admin/branch-table/branch-table.component';
import { AuthorTableComponent } from './admin/author-table/author-table.component';
import { PublisherTableComponent } from './admin/publisher-table/publisher-table.component';
import { BorrowerTableComponent } from './admin/borrower-table/borrower-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableHeaderDirective } from './admin/directives/sortable-header.directive'
import { BranchHttpService } from './admin/services/branch-http/branch-http.service';
import { BorrowerComponent } from './borrower/borrower.component';
import { BookListComponent } from './borrower/book-list/book-list.component';
import { NgbdSortableHeader} from './borrower/services/sortable.directive'
import { BookLoansService } from './borrower/services/book-loan.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { LmsNameSortPipe } from './common/pipes/lms-name-sort.pipe';
import { LmsBranchSortPipe } from './common/pipes/lms-branch-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    AdminComponent,
    BranchTableComponent,
    AuthorTableComponent,
    PublisherTableComponent,
    BorrowerTableComponent,
    LibBranchTableComponent,
    LibrarianComponent,
    LmsSortPipe,
    LibBookTableComponent,
    LibBookCopyTableComponent,
    BranchTableComponent,
    NgbdSortableHeader,
    BorrowerComponent,
    BookListComponent,
    SortableHeaderDirective,
    LmsNameSortPipe,
    LmsBranchSortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BranchHttpService, LmshttpService, PagerService, HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
