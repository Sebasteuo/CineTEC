import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './Administracion/clients/clients.component';
import { MoviesComponent } from './Administracion/movies/movies.component';
import { LocationsComponent } from './Administracion/locations/locations.component';
import { SalasComponent } from './Administracion/salas/salas.component';
import { NavigationComponent } from './Others/navigation/navigation.component';
import { NavigationAdminComponent } from './Others/navigation-admin/navigation-admin.component';
import { NavigationClientComponent } from './Others/navigation-client/navigation-client.component';
import { LoginComponent } from './Others/login/login.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './Others/welcome/welcome.component';
import { RestriccionesComponent } from './Administracion/restricciones/restricciones.component';
import { ProyeccionesComponent } from './Administracion/proyecciones/proyecciones.component';
import { ToastrModule } from 'ngx-toastr';
import { FlatpickrModule } from 'angularx-flatpickr';
import localeEs from '@angular/common/locales/es';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    MoviesComponent,
    LocationsComponent,
    SalasComponent,
    NavigationComponent,
    NavigationAdminComponent,
    NavigationClientComponent,
    LoginComponent,
    WelcomeComponent,
    RestriccionesComponent,
    ProyeccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    FlatpickrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
