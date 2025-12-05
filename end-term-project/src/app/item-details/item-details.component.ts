import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-details',
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item!: Item;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItemById(id).subscribe({
        next: (data) => {
          this.item = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load item.';
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.location.back(); // кнопка "Назад"
  }
}

