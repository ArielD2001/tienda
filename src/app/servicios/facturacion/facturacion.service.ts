import { Injectable } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { DescuentoService } from '../descuentos/descuento.service';
import { IProducto } from 'app/modelos/Producto';
import { Observable, of } from 'rxjs';
import IDescuento from 'app/modelos/Descuento';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(
    private servicioProducto : ProductoService,
    private servicioDescuento: DescuentoService,
  ) { }

  generarIdDeVenta(): number {
    return parseInt(`VENTA-${Date.now()}`);
  }

  obetenerProductoPorId(id : number): Observable<IProducto | null>{
    return this.servicioProducto.obetenerProductoPorId(id);
  }

  validarDescuento(idProducto: number): Observable<IDescuento[] | null> {
    return this.servicioDescuento.validarDescuento(idProducto);
  }

  calcularCantidadActual(precio: number, descuento: number): Observable<number> {
    const cantidad = precio - (precio * descuento);
    return of(cantidad);
  }
}
