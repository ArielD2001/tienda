import { FormsModule } from '@angular/forms';
import { Categoria, ICategoria } from './../../modelos/Categoria';
import { CategoriaService } from './../../servicios/categorias/categoria.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProductoAPI } from 'app/modelos/API/Producto';
import IDescuento from 'app/modelos/Descuento';
import { IProducto, Producto } from 'app/modelos/Producto';
import { PorcentajeDescuentoPipe } from 'app/pipes/porcentaje-descuento.pipe';
import { DescuentoService } from 'app/servicios/descuentos/descuento.service';
import { ProductoService } from 'app/servicios/productos/producto.service';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import IVenta from 'app/modelos/Venta';
import { FacturacionService } from 'app/servicios/facturacion/facturacion.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, PorcentajeDescuentoPipe, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  productos: IProducto[] = [];
  filtroProductos: IProducto[] = [];
  descuentos: IDescuento[] = [];
  categorias: ICategoria[] = [];
  total = 0;
  nombreFiltro: string = '';
  categoriaSeleccionada: number = 0;
  listaProductos : IProducto[] = [];
  listaDescuentos : IDescuento[] = [];
  idVenta: number = 0;
  cantidadVentaActual: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private servicioDescuento: DescuentoService,
    private servicioCategoria: CategoriaService,
    private servicioFacturacion : FacturacionService
  ) {}

  ngOnInit(): void {
    forkJoin({
      categorias: this.categoriaService.obtenerCategorias(),
      productos: this.productoService.getProductos(),
      descuentos: this.servicioDescuento.obtenerDescuentos(),
    }).subscribe({
      next: ({ categorias, productos, descuentos }) => {
        this.categorias = categorias;
        this.descuentos = descuentos;
        this.sanitizarDatos(productos);
      },
      error: (error: any) => {
        console.error('Error en la carga inicial de datos:', error);
      },
    });
  }

  sanitizarDatos(data: IProductoAPI[]): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        // console.log('Categorias:', this.categorias);

        for (let p of data) {
          if (p.image) {
            // console.log('CATEGORIA DE PRODUCTO:', p.category);

            let idCategoria = this.obtenerIdCategoria(p.category);

            if (idCategoria !== undefined) {
              let categoria = new Categoria(idCategoria, p.category);
              let producto = new Producto(
                p.id,
                p.title,
                p.price,
                categoria,
                p.image
              );
              this.productos.push(producto);
              this.filtroProductos = this.productos;
            } else {
              console.warn(`No se encontró la categoría: ${p.category}`);
            }
          }
        }
      },
      error: (error: any) => {
        console.error('Error al obtener categorias:', error);
      },
    });
  }

  obtenerIdCategoria(nombre: string): number | undefined {
    const categoria = this.categorias.find(
      (ctg) => ctg.nombre.toLowerCase() === nombre.toLowerCase()
    );
    return categoria ? categoria.id : undefined;
  }

  filtrarPorCategoria(evento: any) {
    let valor = parseInt(evento.target.value, 10);
    console.log(valor);

    let productosFiltrados = this.productos.filter((p) => {
      return p.categoria.id === valor;
    });

    if (productosFiltrados.length > 0) {
      this.filtroProductos = productosFiltrados;
    } else {
      this.filtroProductos = this.productos;
    }

    console.log(this.filtroProductos);
  }

  filtrarPorNombre(evento: any) {
    console.log(evento.target.value);
    let productosFiltrados = this.productos.filter((p) => {
      return p.titulo.toLowerCase().includes(evento.target.value.toLowerCase());
    });

    if (productosFiltrados.length > 0) {
      this.filtroProductos = productosFiltrados;
    } else {
      this.filtroProductos = this.productos;
    }

    console.log(productosFiltrados);
  }

  productoALista(producto: IProducto) {
    this.idVenta = this.servicioFacturacion.generarIdDeVenta();
    console.log(producto);
    this.listaProductos.push(producto);
    console.log(this.listaProductos);
    this.servicioFacturacion.validarDescuento(producto.id).subscribe({
      next: ( descuentos: IDescuento[] | null)=>{

        if( descuentos && descuentos?.length > 0){

          let descuentoTotal = 0;
          for( let d of descuentos){
            descuentoTotal += d.valor;
            if( !this.listaDescuentos.includes(d)){
              this.listaDescuentos.push(d);
            }
          }

          this.servicioFacturacion.calcularCantidadActual(producto.precio, descuentoTotal).subscribe({
            next: ( actual)=>{
              this.cantidadVentaActual += actual;
              console.log(this.cantidadVentaActual);
            }
          });

          console.log(this.listaDescuentos);
        } else {
          this.servicioFacturacion.calcularCantidadActual(producto.precio, 0).subscribe({
            next: ( actual)=>{
              this.cantidadVentaActual += actual;
              console.log(this.cantidadVentaActual);
            }
          });
        }
      }
    });

    console.log('VENTA TOTAL:: ',this.cantidadVentaActual);

  }

}
