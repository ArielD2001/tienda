import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProductoAPI } from 'app/modelos/API/Producto';
import { ProductoService } from 'app/servicios/productos/producto.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  productos: IProductoAPI[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data: IProductoAPI[]) => {
        this.productos = data;
        console.log('API RESPONSE:: ', this.productos);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

}
