import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescuentoService } from './servicios/descuentos/descuento.service';
import IDescuento from './modelos/Descuento';
import { PorcentajeDescuentoPipe } from './pipes/porcentaje-descuento.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PorcentajeDescuentoPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{

  total = 0;
  menuAbierto = false;

  constructor(){

  }

}
