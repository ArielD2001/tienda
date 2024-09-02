import { ICategoriaAPI } from './Categoria';

export interface IProductoAPI{
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategoriaAPI;
  images: string[];
}
