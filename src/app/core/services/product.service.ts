import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);
  private categories = ['PLCs','HMIs','Drives','Eléctrico','Herramientas','Ofertas'];

  constructor(private http: HttpClient) {
    this.http.get<Product[]>('assets/productos.json')
      .subscribe(data => this.products$.next(data));
  }

  getAll(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getCategories() {
    return this.categories;
  }

  filterByCategory(cat?: string) {
    return this.getAll().pipe(
      map(list => !cat || cat === 'Todos'
        ? list
        : list.filter(p => p.categoria === cat)
      )
    );
  }

  search(term: string, cat?: string) {
    const t = (term || '').toLowerCase().trim();
    return this.filterByCategory(cat).pipe(
      map(list => !t
        ? list
        : list.filter(p =>
            p.nombre.toLowerCase().includes(t) ||
            (p.codigo || '').toLowerCase().includes(t)
        )
      )
    );
  }
}