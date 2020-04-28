import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    AdminComponent,
    LibBranchTableComponent,
    LibrarianComponent,
    LmsSortPipe,
    LibBookTableComponent,
    LibBookCopyTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LmshttpService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
