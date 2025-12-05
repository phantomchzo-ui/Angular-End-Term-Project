import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  searchTerm: string = '';
  errorMessage = '';
  isLoading = true;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.filteredItems = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  searchItems() {
    if (!this.searchTerm.trim()) {
      this.filteredItems = this.items;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(searchTermLower) ||
      item.description.toLowerCase().includes(searchTermLower) ||
      item.category.toLowerCase().includes(searchTermLower)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredItems = this.items;
  }
}

