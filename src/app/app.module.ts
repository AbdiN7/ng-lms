import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { BranchTableComponent } from './admin/branch-table/branch-table.component';
import { AuthorTableComponent } from './admin/author-table/author-table.component';
import { PublisherTableComponent } from './admin/publisher-table/publisher-table.component';
import { BorrowerTableComponent } from './admin/borrower-table/borrower-table.component';
import { AdminHttpService } from './common/admin-http.service';
import { FormsModule } from '@angular/forms';

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
    BorrowerTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [AdminHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
