import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Director } from '../Models/director.Model';
import { Movie } from '../Models/movie.Model';
import { Protagonista } from '../Models/protagonista.Model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  Movies: Movie[] = []
  currentMovie: Movie ={
    nombre:"",
  protagonistas: "",
  director:"",
  duracion:"",
  clasificacion:"",
  nombreogpelicula:"",
  imagen:"",
  peliid:0,
  precioninos:0,
  precioadulto:0,
  preciocidoro:0
   
    
  }
  director: Director[]=[]
  protagonista: Protagonista[]=[]
  constructor(public http:HttpClient) { }
  /**
   * 
   * @returns 
   */
  async getMovies(){  //Función que obtiene Moviees

    await this.http.get(environment.api+"/Pelicula").toPromise().then(res=>{
      this.Movies=res as Movie[]

    
    })

    return this.Movies
    
  }

  async getDirectorById(id:string){
    await this.http.get(environment.api+"/Director/"+ id).toPromise().then(res=>{
      this.director=res as Director[]
     })
     return this.director
  }

  async getProtagonistaById(id:string){
    await this.http.get(environment.api+"/Protagonista/"+ id).toPromise().then(res=>{
      this.protagonista=res as Protagonista[]
     })
     return this.protagonista
  }

  async getMoviesById(id:number){  //Función que obtiene Moviees según su ID

    await this.http.get(environment.api+"/Pelicula/"+ id).toPromise().then(res=>{
      this.currentMovie=res as Movie

    
    })

    return this.currentMovie
    
  }
  
  //Envía el ID del Moviee que se va a eliminar al API
  async deleteMovie(id: number | undefined) {
    //this.Movies = this.Movies.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api+'/Pelicula/'+id).toPromise().then(res=>{this.getMovies().then(result=>{this.Movies=result})})
    return this.Movies
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editMovie(Movie: Movie) {
    await this.http.put(environment.api+"/Pelicula", Movie).toPromise().then(res=>{this.getMovies().then(result=>{this.Movies=result})})
    return this.Movies
  }

  //Envía los datos de un nuevo Moviee al API
  async addMovie(Movie : Movie){
    const body = {}
    await this.http.post(environment.api+"/Pelicula", Movie).toPromise().then(res=>{this.getMovies().then(result=>{this.Movies=result})})
    return this.Movies;
  }
}
