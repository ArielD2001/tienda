import { Observable, of } from 'rxjs';
import { ICategoria } from './../../modelos/Categoria';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private categorias: ICategoria[] = [
    {
      id: 1,
      nombre: 'jewelery',
    },
    {
      id: 2,
      nombre: 'electronics',
    },
    {
      id: 3,
      nombre: "women's clothing",
    },
    {
      id: 4,
      nombre: "men's clothing",
    },
  ];

  constructor() {}

  obtenerCategorias(): Observable<ICategoria[]> {
    return of(this.categorias);
  }
}
