import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FormsModule, CommonModule, ProductCard],
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss']
})
export class Productos implements OnInit {
  categorias: string[] = [];
  seleccion = 'Todos';
  term = '';
  productos$!: Observable<Product[]>;

  constructor(private products: ProductService) {}

  ngOnInit(): void {
    this.categorias = ['Todos', ...this.products.getCategories()];
    this.productos$ = this.products.filterByCategory();
  }

  filtrar(cat: string) {
    this.seleccion = cat;
    this.buscar();
  }

  buscar() {
    this.productos$ = this.products.search(this.term, this.seleccion);
  }
}