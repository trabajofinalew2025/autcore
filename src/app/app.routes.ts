
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Carrito} from './pages/carrito/carrito';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  { path: 'productos', component: Productos, title: 'Productos' },
  { path: 'carrito', component: Carrito, title: 'Carrito' },
  { path: '**', redirectTo: '' }
];
