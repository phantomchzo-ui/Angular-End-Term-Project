import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService); // ✅ вместо constructor
  private router = inject(Router);

  isLoginMode = true;

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '', confirmPassword: '' };

  errorMsg = '';
  loading = false;

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMsg = '';
  }

  private isPasswordStrong(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return re.test(password);
  }

  async onLoginSubmit() {
    this.errorMsg = '';
    this.loading = true;
    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMsg = err?.message || 'Login error';
    } finally {
      this.loading = false;
    }
  }

  async onRegisterSubmit() {
    this.errorMsg = '';

    if (!this.registerData.name?.trim()) {
      this.errorMsg = 'Введите имя';
      return;
    }
    if (!this.registerData.email?.includes('@')) {
      this.errorMsg = 'Введите корректный email';
      return;
    }
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMsg = 'Пароли не совпадают';
      return;
    }
    if (!this.isPasswordStrong(this.registerData.password)) {
      this.errorMsg = 'Пароль должен быть минимум 8 символов, содержать хотя бы одну цифру и один спец. символ';
      return;
    }

    this.loading = true;
    try {
      await this.authService.register(this.registerData.name, this.registerData.email, this.registerData.password);
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMsg = err?.message || 'Registration error';
    } finally {
      this.loading = false;
    }
  }
}
