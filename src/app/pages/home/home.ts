/* import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}
 */
/* 

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}
 */


/* import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  @ViewChild('scrollArea') scrollArea!: ElementRef;

  scrollLeft() {
    this.scrollArea.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollArea.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  // Si luego quieres manejar las categorías desde TS:
  categories = [
    { name: 'PLCs', icon: 'bi bi-phone' },
    { name: 'HMIs', icon: 'bi bi-smartwatch' },
    { name: 'Drives', icon: 'bi bi-camera' },
    { name: 'Eléctrico', icon: 'bi bi-headphones' },
    { name: 'Herramientas', icon: 'bi bi-display' },
    { name: 'Ofertas', icon: 'bi bi-controller' }
  ];
}
 */


import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  @ViewChild('scrollArea') scrollArea!: ElementRef;

  constructor(
    private http: HttpClient,
    private cart: CartService   //  👈  IMPORTANTE: Inyectamos el carrito
  ) {
    this.loadProducts();
  }

  /* ---------------------------------------
      1) CATEGORÍAS DEL SLIDER
  ----------------------------------------- */
  categories = [
    { name: 'PLCs', icon: 'bi bi-phone' },
    { name: 'HMIs', icon: 'bi bi-smartwatch' },
    { name: 'Drives', icon: 'bi bi-camera' },
    { name: 'Eléctrico', icon: 'bi bi-headphones' },
    { name: 'Herramientas', icon: 'bi bi-display' },
    { name: 'Ofertas', icon: 'bi bi-controller' }
  ];

  scrollLeft() {
    this.scrollArea.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollArea.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  /* ---------------------------------------
      2) PRODUCTOS (Desde JSON)
  ----------------------------------------- */
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  activeTab = 'solicitados';

  loadProducts() {
    this.http.get<Product[]>('assets/productos.json').subscribe({
      next: (data) => {
        this.allProducts = data;
        this.filteredProducts = [...this.allProducts];
      },
      error: (err) => console.error('Error cargando productos.json', err)
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.filteredProducts = [...this.allProducts];
  }

  toggleFav(p: Product) {
    (p as any).fav = !(p as any).fav;
  }

  /* ---------------------------------------
      3) AGREGAR AL CARRITO (lo que faltaba)
  ----------------------------------------- */
  addToCart(p: Product) {
    this.cart.add(p, 1);
    console.log('Producto agregado:', p.nombre);
  }
}