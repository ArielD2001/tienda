import { Observable, of } from 'rxjs';
import { ICategoria } from './../../modelos/Categoria';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias : ICategoria[] = [];

  constructor() { }

  obtenerCategorias() : Observable<ICategoria[]>{
    return of(this.categorias);
  }
}
