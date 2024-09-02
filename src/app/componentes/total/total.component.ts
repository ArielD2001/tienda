import { Component, OnInit } from '@angular/core';
import { IProductoAPI } from '../../modelos/API/Producto';
import { ProductoService } from '../../servicios/productos/producto.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './total.component.html',
  styleUrl: './total.component.css',
})
export class TotalComponent {

}
