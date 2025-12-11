// src/app/home-page/home-page.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Для Angular директив
import { RouterModule } from '@angular/router'; // Для [routerLink]
import { FormsModule } from '@angular/forms'; // Для [(ngModel)] в поиске

@Component({
  selector: 'app-home-page',
  standalone: true,
  // 🚨 ИМПОРТ: Включаем все необходимые модули
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  // Свойство для связывания поля поиска
  public searchInput: string = '';

  // Метод для обработки поиска (логика, которая будет вызываться при нажатии Enter или кнопки)
  onSearch() {
    if (this.searchInput.trim()) {
      // Здесь должна быть реальная логика перехода на страницу поиска:
      // this.router.navigate(['/items'], { queryParams: { q: this.searchInput } });
      console.log('Выполняется поиск:', this.searchInput);
      this.searchInput = ''; // Очистка поля
    }
  }
}
