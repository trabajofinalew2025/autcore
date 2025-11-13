import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

export interface CartItem {
  product: Product;
  qty: number;
}

const LS_KEY = 'cart_items_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>(this.read());

  private read(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private write() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.items$.value));
  }

  getItems() {
    return this.items$.asObservable();
  }

  getCount() {
    return this.items$.value.reduce((s, i) => s + i.qty, 0);
  }

  getTotal() {
    return this.items$.value.reduce((s, i) => s + i.product.precio * i.qty, 0);
  }

  add(product: Product, qty = 1) {
    const items = this.items$.value.slice();
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) {
      items[idx].qty += qty;
    } else {
      items.push({ product, qty });
    }
    this.items$.next(items);
    this.write();
  }

  updateQty(id: number, qty: number) {
    const items = this.items$.value.slice();
    const i = items.findIndex(x => x.product.id === id);
    if (i >= 0) {
      items[i].qty = Math.max(1, Math.floor(Number(qty) || 1));
      this.items$.next(items);
      this.write();
    }
  }

  remove(id: number) {
    this.items$.next(this.items$.value.filter(i => i.product.id !== id));
    this.write();
  }

  clear() {
    this.items$.next([]);
    this.write();
  }
}