import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';


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
    // {
    //   path: "lms/borrower",
    //   component: ,
    //   children:[]
    // }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
