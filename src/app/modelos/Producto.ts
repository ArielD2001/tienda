import { ICategoria } from './Categoria';

export interface IProducto{
  id: number;
  titulo: string;
  precio: number;
  categoria: ICategoria;
  imagen: string;
}

export class Producto implements IProducto{

  id: number;
  titulo: string;
  precio: number;
   categoria: ICategoria;
  imagen : string;

  constructor( id: number, titulo: string, precio: number, categoria: ICategoria, imagen : string ){
    this.id = id;
    this.titulo = titulo;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}
