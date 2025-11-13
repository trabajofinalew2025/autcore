export interface Product {
  id: number;
  nombre: string;
  codigo?: string;            // opcional
  categoria: string;          // PLCs, HMIs, Drives, etc.
  descripcion?: string;       // opcional
  precio: number;
  imagen?: string;            // opcional (URL)
}