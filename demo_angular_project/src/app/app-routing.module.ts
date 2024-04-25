import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '',
    loadChildren: () => import('./pages/sidebar/sidebar.module').then( m => m.SidebarModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
