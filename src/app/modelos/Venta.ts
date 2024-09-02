import { IProducto } from './Producto';
import IDescuento from "./Descuento";

export default interface IVenta{
  id: number;
  cantidad: number;
  productos: IProducto[];
  descuentos ?: IDescuento[];
}
