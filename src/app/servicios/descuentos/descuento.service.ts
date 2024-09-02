import { Injectable } from '@angular/core';
import IDescuento from 'app/modelos/Descuento';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  private descuentos: IDescuento[] = [
    {
      id: 1,
      titulo: "Dia de las madres",
      valor: 0.4,
      vencimiento: "12-24-2024",
      productos: [1,2,3]
    },
    {
      id: 2,
      titulo: "Ropa de hombre",
      valor: 0.5,
      vencimiento: "12-24-2024",
      productos: [1,2,3]
    },
    {
      id: 3,
      titulo: "Martes Locochon",
      valor: 0.1,
      vencimiento: "12-24-2024",
      productos: [1,2,3]
    }
  ];

  constructor() {}

  obtenerDescuentos(): Observable<IDescuento[]> {
    return of(this.descuentos);
  }

  validarDescuento(idProducto: number): Observable<IDescuento[] | null> {
    const descuento = this.descuentos.filter((d) =>{
      return d.productos.includes(idProducto);
    });
    return of(descuento || null);
  }
}
