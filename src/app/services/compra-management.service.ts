import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Models/movie.Model';
import { Location } from 'src/app/Models/location.Model';
import { Proyeccion } from '../Models/proyeccion.Model';
import { PeliculaXSucursal } from '../Models/pelicula-xsucursal.model';
import { ButacaXfuncion } from '../Models/butaca-xfuncion.model';
import { Butaca } from '../Models/butaca.model';
import { FacturacionManagementService } from './facturacion-management.service';
import { Factura } from '../Models/factura.model';
import { jsPDF } from "jspdf";
import { Compra } from '../Models/compra.Model';

@Injectable({
  providedIn: 'root'
})
export class CompraManagementService {

  locations: Location[] = []
  movies: Movie[] = []
  proyecciones: Proyeccion[] = []
  seats: ButacaXfuncion[] = []
  peliculasXsucursal: PeliculaXSucursal[] = []
  butacas: Butaca[] = []
  butacaXFuncion: ButacaXfuncion = { numerodeasiento: 0, funcionid: "" }
  xml: string = ""
  newFactura: Factura = {
    monto: 0,
    nombre: "",
    telefono: 0,
    correoelectronico: "",
    identificacion: 0,
    funcionid: "",
    facturaid: 0,
    numerodeasiento: [],
    provincia: "",
    canton: "",
    distrito: ""

  }

  constructor(private http: HttpClient, private facturacionservice: FacturacionManagementService) { }

  async getLocations() {
    await this.http.get(environment.api + "/sucursal/").toPromise().then(res => {
      this.locations = res as Location[]
    })
    return this.locations
  }


  async purchase(sucursal: string, sala: string, proyeccion: string, pelicula: Movie, factura: Factura, proyeccionid: string, compra: Compra) {
    factura.numerodeasiento.forEach(asiento => {
      this.butacaXFuncion.numerodeasiento = asiento
      this.butacaXFuncion.funcionid = proyeccionid
      this.http.post(environment.api + "/butacaXFuncion", this.butacaXFuncion).toPromise().then(res => {
      })
    })
    await this.facturacionservice.addFactura(sucursal, sala, proyeccion, pelicula, factura, compra).then(res2 => {
      this.newFactura = res2
    })
    return this.newFactura
  }


  async getButacasBySala(id: string) {
    await this.http.get(environment.api + "/butaca/" + id).toPromise().then(res => {
      this.butacas = res as Butaca[]
    })
    return this.butacas
  }

  async getXML(sucursal: string, sala: string, proyeccion: string, pelicula: Movie, factura: Factura) {
    await this.facturacionservice.generateXML(sucursal, sala, proyeccion, pelicula, factura).then(res3 => {
      this.xml = res3
    })
    return this.xml
  }

  async getPDF(sucursal: string, sala: string, proyeccion: string, pelicula: Movie, factura: Factura) {
    var doc = new jsPDF({ putOnlyUsedFonts: true });
    await this.facturacionservice.generatePDF(sucursal, sala, proyeccion, pelicula, factura).then(res => { doc = res });
    return doc
  }

  async getMovies(id: string) {
    await this.http.get(environment.api + "/PeliculaXSucursal/" + id).toPromise().then(res => {
      this.peliculasXsucursal = res as PeliculaXSucursal[]
      this.peliculasXsucursal.forEach((pelicula, index) => {
        this.http.get(environment.api + "/Pelicula/" + pelicula.peliid).toPromise().then(result => {
          this.movies[index] = (result as Movie[])[0]
        })
      })
    })
    return this.movies
  }

  async getProyecciones(id: string) {
    await this.http.get(environment.api + "/funcion/GetFuncionByMovie/" + id).toPromise().then(res => {
      this.proyecciones = res as Proyeccion[]
    })
    return this.proyecciones
  }
  async getSeats(id: number) {
    await this.http.get(environment.api + "/butacaXfuncion/" + id).toPromise().then(res => {
      this.seats = res as ButacaXfuncion[]
    })
    return this.seats
  }

}




