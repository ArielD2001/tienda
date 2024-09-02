import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porcentajeDescuento',
  standalone: true
})
export class PorcentajeDescuentoPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) return '';
    const porcentaje = value * 100;
    return `${porcentaje}%`;
  }

}
