import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductoAPI } from '../../modelos/API/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<IProductoAPI[]> {
    return this.http.get<IProductoAPI[]>(this.apiUrl);
  }
}
