

import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule, NgIf, DecimalPipe,CommonModule  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCard {
  @Input() product!: Product;
  qty = 1;

  constructor(private cart: CartService) {}

  add() {
    this.qty = Math.max(1, Math.floor(Number(this.qty) || 1));
    this.cart.add(this.product, this.qty);
    this.qty = 1;
  }
  minQty(q: number): number {
  return Math.max(1, q);
}
}
