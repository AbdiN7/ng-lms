import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { BorrowerComponent } from './borrower/borrower.component';
import { BookListComponent } from './borrower/book-list/book-list.component';


const routes: Routes = [{
  path: "",
  component: LayoutComponent,
  children:[
    {
      path: '',
      redirectTo: 'lms/home',
      pathMatch: 'full'
    },
    {
      path: 'lms/home',
      component: HomeComponent
    },
    {
      path: "lms/admin",
      component: AdminComponent,
      children:[]
    },
    {
      path: "lms/borrower",
      component: BorrowerComponent,
      children:[]
    },
    {
    path: "lms/borrower/booklist",
    component: BookListComponent,
    children:[]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
