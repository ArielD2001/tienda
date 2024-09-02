import { Categoria, ICategoria } from './../../modelos/Categoria';
import { CategoriaService } from './../../servicios/categorias/categoria.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProductoAPI } from 'app/modelos/API/Producto';
import { IProducto, Producto } from 'app/modelos/Producto';
import { ProductoService } from 'app/servicios/productos/producto.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  productos: IProducto[] = [];


  constructor(private productoService: ProductoService, private categoriaService : CategoriaService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data: IProductoAPI[]) => {
        console.log(data);
        this.sanitizarDatos(data);
        console.log('API RESPONSE:: ', this.productos);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  sanitizarDatos(data: IProductoAPI[]): void {
    let newid: number;
    let categoria: Categoria;

    for (let p of data) {
      if (p.image) {
        console.log(p.image);

        this.categoriaService.obtenerCategorias().subscribe({
          next: (data) => {
            newid = data.length + 1;
            categoria = new Categoria(newid, p.category);
            let producto = new Producto(
              p.id,
              p.title,
              p.price,
              categoria,
              p.image
            );

            this.productos.push(producto);
          },
          error: (error: any) => {
            console.error('Error al obtener categorias:', error);
          }
        });
      }
    }
  }

}
