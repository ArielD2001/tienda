import { IProducto } from "./Producto"

export default interface IDescuento{
  id: number,
  titulo: string,
  valor: number,
  vencimiento: string,
  productos: number[]
}
