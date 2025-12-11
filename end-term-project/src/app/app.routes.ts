import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'about', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemComponent, canActivate: [AuthGuard] },
  /*{ path: '**', redirectTo: '/items' } ,*/
  { path: 'items/:id', component: ItemDetailsComponent },
  { path: 'home', component: HomePageComponent },
];
