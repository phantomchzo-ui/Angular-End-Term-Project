// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component'; // 🚨 Убедитесь, что импортирован
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component'; // 🚨 Убедитесь, что импортирован
import { ItemDetailsComponent } from './item-details/item-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard'; // Ваш функциональный Guard


export const routes: Routes = [

  // 1. Корень ведет на незащищенную Home (главную витрину)
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // 2. Страницы без защиты
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomePageComponent,
    // 💡 УБРАН Guard: Доступно всем
  },
  {
    path: 'items',
    component: ItemComponent, // 💡 ДОБАВЛЕНА СТРАНИЦА СПИСКА ТОВАРОВ
    // Guard убран, чтобы неавторизованные могли видеть каталог
  },
  { path: 'about', component: AboutUsComponent },
  { path: 'items/:id', component: ItemDetailsComponent },

  // 3. 🛡️ ЗАЩИЩЕННЫЙ МАРШРУТ
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard] // 🔒 Доступ только авторизованным
  },

  // 4. Опциональный редирект для несуществующих URL
  { path: '**', redirectTo: '/home' }
];
