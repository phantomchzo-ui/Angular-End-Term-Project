import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private key = 'favorites';

  getAll() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  add(item: any) {
    const fav = this.getAll();

    if (!fav.some((x: any) => x.id === item.id)) {
      fav.push(item);
      localStorage.setItem(this.key, JSON.stringify(fav));
    }
  }

  remove(id: number) {
    const fav = this.getAll().filter((x: any) => x.id !== id);
    localStorage.setItem(this.key, JSON.stringify(fav));
  }

  exists(id: number): boolean {
    return this.getAll().some((x: any) => x.id === id);
  }
}

