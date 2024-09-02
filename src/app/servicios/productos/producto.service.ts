import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProductoAPI } from '../../modelos/API/Producto';
import { IProducto } from 'app/modelos/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private productosSanitizados: IProducto[] = [];

  constructor(private http: HttpClient) {}

  getProductos(): Observable<IProductoAPI[]> {
    return this.http.get<IProductoAPI[]>(this.apiUrl);
  }

  setProductosSanitizados(producto: IProducto): Observable<IProducto[]> {
    this.productosSanitizados.push(producto);
    return of(this.productosSanitizados);
  }
}
