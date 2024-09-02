import { InicioComponent } from './componentes/inicio/inicio.component';
import { TotalComponent } from './componentes/total/total.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'factura',
    component: TotalComponent
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
