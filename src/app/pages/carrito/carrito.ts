import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { CartService, CartItem } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss']
})
export class Carrito implements OnInit {
  items: CartItem[] = [];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.getItems().subscribe(items => this.items = items);
  }

  updateQty(id: number, q: number) {
    this.cart.updateQty(id, q);
  }

  remove(id: number) {
    this.cart.remove(id);
  }

  clear() {
    this.cart.clear();
  }

  total() {
    return this.cart.getTotal();
  }
}