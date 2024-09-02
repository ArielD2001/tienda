export interface ICategoria{
  id: number;
  nombre: string;
}

export class Categoria implements ICategoria{

  id: number;
  nombre: string;

  constructor(id: number, nombre: string ){
    this.id = id;
    this.nombre = nombre;
  }
}
