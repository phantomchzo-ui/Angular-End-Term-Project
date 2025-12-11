// src/app/app.component.ts

import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Добавляем Router
import { CommonModule } from '@angular/common'; // Добавляем CommonModule для *ngIf
import { AuthService } from './services/auth.service'; // Импортируем AuthService
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  // 🚨 ОБНОВЛЕНИЕ: добавляем CommonModule для использования *ngIf и *ngFor
  imports: [RouterModule, CommonModule]
})
export class AppComponent {
  private authService = inject(AuthService); // Инжектируем AuthService
  private router = inject(Router); // Инжектируем Router

  // Observable, который отслеживает состояние авторизации (User или null)
  user$: Observable<User | null> = this.authService.authState$;

  /**
   * Метод для выхода пользователя.
   */
  async onLogout() {
    try {
      await this.authService.logout();
      // После выхода перенаправляем на страницу входа
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  }
}
