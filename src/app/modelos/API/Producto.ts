import { ICategoriaAPI } from './Categoria';

export interface IProductoAPI{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating : {
    rate: number,
    count: number
  }
}
