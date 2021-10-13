import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Models/movie.Model';
import { Location } from 'src/app/Models/location.Model';
import { Proyeccion } from '../Models/proyeccion.Model';
import { PeliculaXSucursal } from '../Models/pelicula-xsucursal.model';
import { ButacaXfuncion } from '../Models/butaca-xfuncion.model';
import { Butaca } from '../Models/butaca.model';

@Injectable({
  providedIn: 'root'
})
export class CompraManagementService {

  locations: Location[] = []
  movies: Movie[] = []
  proyecciones: Proyeccion[] = []
  seats: ButacaXfuncion[] = []
  peliculasXsucursal: PeliculaXSucursal[] = []
  butacas: Butaca[]=[]

  constructor(private http: HttpClient) { }

  async getLocations() {
    await this.http.get(environment.api + "/sucursal/").toPromise().then(res => {
      this.locations = res as Location[]
    })
    return this.locations
  }

  
  async getButacasBySala(id:string) {
    await this.http.get(environment.api + "/butaca/"+id).toPromise().then(res => {
      this.butacas = res as Butaca[]
      console.log(this.butacas)
    })
    return this.butacas
  }

  //https://drive.google.com/file/d/1M9p8HgieJP81xwxaJ_s_ynEyzyMQKRSX/view?usp=sharing
  //https://drive.google.com/file/d/1L8XXGgilp5ChBUOlEvkPtIJ7-TAizhG-/view?usp=sharing
  //
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

