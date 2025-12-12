// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component'; // 🚨 Убедитесь, что импортирован
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component'; // 🚨 Убедитесь, что импортирован
import { ItemDetailsComponent } from './item-details/item-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard'; // Ваш функциональный Guard
import { FavoritesComponent } from './favorites/favorites.component';


export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'favorites', component: FavoritesComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'items',
    component: ItemComponent,
  },
  { path: 'about', component: AboutUsComponent },
  { path: 'items/:id', component: ItemDetailsComponent },


  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },


  { path: '**', redirectTo: '/home' }
];
