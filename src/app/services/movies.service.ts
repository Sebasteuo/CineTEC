import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Clasificacion } from '../Models/clasificacion.Model';

import { Director } from '../Models/director.Model';
import { Movie } from '../Models/movie.Model';
import { Protagonista } from '../Models/protagonista.Model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  Movies: Movie[] = []
  currentMovie: Movie = {
    nombre: "",
    protagonistas: "",
    director: "",
    duracion: "",
    clasificacion: "",
    nombreogpelicula: "",
    imagen: "",
    peliid: "",
    precioninos: 0,
    precioadulto: 0,
    preciocidoro: 0,
    cedulaempleado: 12345678
  }
  director: Director[] = []
  protagonista: Protagonista[] = []
  clasificacion: Clasificacion[] = []
  newClasificacion: Clasificacion = {
    peliid: "",
    descripcion: ""
  }
  newProtagonista: Protagonista = {
    peliid: "",
    nombreprotagonista: ""
  }
  newDirector: Director = {
    peliid: "",
    nombredirector: ""
  }
  constructor(public http: HttpClient, private toastr: ToastrService) { }
  /**
   * 
   * @returns 
   */
  async getMovies() {  //Función que obtiene Moviees

    await this.http.get(environment.api + "/Pelicula").toPromise().then(res => {
      this.Movies = res as Movie[]
    })
    return this.Movies
  }

  async getDirectorById(id: string) {
    await this.http.get(environment.api + "/Director/" + id).toPromise().then(res => {
      this.director = res as Director[]
    })
    return this.director
  }

  async getProtagonistaById(id: string) {
    await this.http.get(environment.api + "/Protagonista/" + id).toPromise().then(res => {
      this.protagonista = res as Protagonista[]
    })
    return this.protagonista
  }

  async getClasificacionById(id: string) {
    await this.http.get(environment.api + "/Clasificacion/" + id).toPromise().then(res => {
      this.clasificacion = res as Clasificacion[]
    })
    return this.clasificacion
  }


  async getMoviesById(id: string) {  //Función que obtiene Moviees según su ID
    await this.http.get(environment.api + "/Pelicula/" + id).toPromise().then(res => {
      this.currentMovie = res as Movie
    })
    return this.currentMovie
  }

  //Envía el ID del Moviee que se va a eliminar al API
  async deleteMovie(id: string | undefined) {
    //this.Movies = this.Movies.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api + '/Protagonista/' + id).toPromise().then(res => {
      this.http.delete(environment.api + '/Director/' + id).toPromise().then(res1 => {
        this.http.delete(environment.api + '/Clasificacion/' + id).toPromise().then(res2 => {
          this.http.delete(environment.api + '/Funcion/DeleteByPelicula/' + id).toPromise().then(res2 => {
            this.http.delete(environment.api + '/Pelicula/' + id).toPromise().then(res3 => { this.getMovies().then(result => { this.Movies = result }) })
          })
        })
      })
    })



    return this.Movies
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editMovie(Movie: Movie) {
    await this.http.put(environment.api + "/Pelicula", Movie).toPromise().then(res => {
      this.newProtagonista.peliid = Movie.peliid as unknown as string
      this.newProtagonista.nombreprotagonista = Movie.protagonistas as unknown as string
      try {
        this.http.put(environment.api + '/Protagonista', this.newProtagonista).toPromise().then(res2 => {

        })
      }
      catch { this.toastr.error("No se ha podido actualizar el protagonista") }
      this.newDirector.peliid = Movie.peliid as unknown as string
      this.newDirector.nombredirector = Movie.director as unknown as string
      try {
        this.http.put(environment.api + '/Director', this.newDirector).toPromise().then(res2 => {

        })
      }
      catch { this.toastr.error("No se ha podido actualizar el director") }

      this.newClasificacion.peliid = Movie.peliid as unknown as string
      this.newClasificacion.descripcion = Movie.clasificacion as unknown as string
      try {
        this.http.put(environment.api + '/Clasificacion', this.newClasificacion).toPromise().then(res2 => {

        })
      }
      catch { this.toastr.error("No se ha podido actualizar la clasificación") }

      this.getMovies().then(result => {
        this.Movies = result
      })
    })
    return this.Movies
  }

  //Envía los datos de un nuevo Moviee al API
  async addMovie(Movie: Movie) {
    this.newDirector.peliid = Movie.peliid as unknown as string
    this.newDirector.nombredirector = Movie.director as unknown as string
    this.newClasificacion.peliid = Movie.peliid as unknown as string
    this.newClasificacion.descripcion = Movie.clasificacion as unknown as string
    this.newProtagonista.peliid = Movie.peliid as unknown as string
    this.newProtagonista.nombreprotagonista = Movie.protagonistas as unknown as string
    await this.http.post(environment.api + "/Pelicula", Movie).toPromise().then(res => { 
      this.http.post(environment.api + "/Director", this.newDirector).toPromise().then(res2 => { 
        this.http.post(environment.api + "/Protagonista", this.newProtagonista).toPromise().then(res3 => { 
          this.http.post(environment.api + "/Clasificacion", this.newClasificacion).toPromise().then(res4 => { 
      this.getMovies().then(result => { this.Movies = result }) })})})})
    return this.Movies;
  }
}



