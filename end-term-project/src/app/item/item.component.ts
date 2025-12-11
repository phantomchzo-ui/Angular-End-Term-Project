import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = [];

  searchTerm = '';
  search$ = new Subject<string>();

  selectedCategory = '';
  minPrice = 0;
  maxPrice = 9999;

  page = 1;
  limit = 6;

  errorMessage = '';
  isLoading = true;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: data => {
        this.items = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });

    this.search$
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => this.applyFilters());
  }

  onSearchInput(value: string) {
    this.search$.next(value);
  }

  applyFilters() {
    let result = [...this.items];

    const s = this.searchTerm.toLowerCase();
    if (s) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(s) ||
        item.description.toLowerCase().includes(s) ||
        item.category.toLowerCase().includes(s)
      );
    }

    if (this.selectedCategory) {
      result = result.filter(item => item.category === this.selectedCategory);
    }

    result = result.filter(item =>
      item.price >= this.minPrice && item.price <= this.maxPrice
    );

    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;

    this.filteredItems = result.slice(start, end);
  }

  nextPage() {
    this.page++;
    this.applyFilters();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.applyFilters();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilters();
  }
}

