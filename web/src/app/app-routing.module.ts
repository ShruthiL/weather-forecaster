import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './guards/auth.guard';
import {AppGuard} from './guards/app.guard';

import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from "./pages/home/home.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {AddComponent} from "./pages/add/add.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AppGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent , canActivate: [AuthGuard]},
  {path: 'add', component: AddComponent, canActivate: [AppGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
