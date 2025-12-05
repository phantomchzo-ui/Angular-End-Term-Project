import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode = true; 
  
  loginData = {
    email: '',
    password: ''
  };
  
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log('Переключен режим на:', this.isLoginMode ? 'ЛОГИН' : 'РЕГИСТРАЦИЯ');
  }


  // В компоненте обновите console.log сообщения:
onLoginSubmit() {
  console.log('=== LOGIN DATA ===');
  console.log('Email:', this.loginData.email);
  console.log('Password:', this.loginData.password);
  console.log('==================');
}

onRegisterSubmit() {
  console.log('=== REGISTRATION DATA ===');
  console.log('Name:', this.registerData.name);
  console.log('Email:', this.registerData.email);
  console.log('Password:', this.registerData.password);
  console.log('Confirm Password:', this.registerData.confirmPassword);
  console.log('=========================');
}
}