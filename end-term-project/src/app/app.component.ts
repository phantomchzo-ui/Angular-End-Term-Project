import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { Observable, of } from 'rxjs';
import { User } from '@angular/fire/auth';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private profileService = inject(ProfileService);

  user$: Observable<User | null> = this.authService.authState$;

  profileImageUrl$: Observable<string | null> = this.user$.pipe(
    // Фильтруем, чтобы обрабатывать только авторизованных пользователей (user !== null)
    filter((user): user is User => !!user),
    // Как только есть User, переключаемся на запрос URL из ProfileService
    switchMap(user => this.profileService.getProfileImageUrl(user.uid)),
    // Если пользователь не авторизован, можно вернуть пустой Observable (или of(null)
    // Но filter уже позаботился об этом, поэтому здесь будет только URL или null/undefined
  );

  // Дополнительно: Observable для имени пользователя
  userName$: Observable<string | null> = this.user$.pipe(
    switchMap(user => of(user?.displayName || user?.email || null))
  );

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  }
}
