import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './Administracion/clients/clients.component';
import { EmpleadoComponent } from './Administracion/empleado/empleado.component';
import { LocationsComponent } from './Administracion/locations/locations.component';
import { MoviesComponent } from './Administracion/movies/movies.component';
import { ProyeccionesComponent } from './Administracion/proyecciones/proyecciones.component';
import { RestriccionesComponent } from './Administracion/restricciones/restricciones.component';
import { SalasComponent } from './Administracion/salas/salas.component';
import { CompraComponent } from './Cliente/compra/compra.component';
import { LoginComponent } from './Others/login/login.component';
import { RegistroComponent } from './Others/registro/registro.component';
import { WelcomeComponent } from './Others/welcome/welcome.component';

const routes: Routes = [

  { path: '', redirectTo: 'Login', pathMatch: 'full' }, //Al entrar al localhost, se le agrega a la ruta Welcome
  { path: 'Welcome', component: WelcomeComponent}, // Se hacen navegables y  los componentes
  { path: 'Clientes', component: ClientsComponent}, // Se hacen navegables y  los componentes
  { path: 'Salas', component: SalasComponent}, // Se hacen navegables y  los componentes
  { path: 'Proyecciones', component: ProyeccionesComponent}, // Se hacen navegables y  los componentes
  { path: 'Restricciones', component: RestriccionesComponent}, // Se hacen navegables y  los componentes
  { path: 'Sucursales', component: LocationsComponent}, // Se hacen navegables y  los componentes
  { path: 'Peliculas', component: MoviesComponent}, // Se hacen navegables y  los componentes
  { path: 'Empleados', component: EmpleadoComponent}, // Se hacen navegables y  los componentes
  { path: 'Login', component: LoginComponent}, // Se hacen navegables y  los componentes
  { path: 'Registro', component: RegistroComponent}, // Se hacen navegables y  los componentes
  { path: 'Compra', component: CompraComponent}, // Se hacen navegables y  los componentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
