import { ICategoria } from './Categoria';

export interface IProducto{
  id: number;
  titulo: string;
  precio: number;
  categoria: ICategoria;
  imagen: string;
}
