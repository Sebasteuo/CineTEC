import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Models/movie.Model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  Movies: Movie[] = []
  currentMovie: Movie ={
    nombre:"",
    protagonistas: [],
    director:"",
    duracion:"",
    clasificacion:"",
    imagen:"",
    id: 0,
    priceChildren:0,
    priceAdult:0,
    priceGoldenCitizen:0
   
    
  }
  constructor(public http:HttpClient) { }
  /**
   * 
   * @returns 
   */
  async getMovies(){  //Función que obtiene Moviees

    await this.http.get(environment.api+"/Movie").toPromise().then(res=>{
      this.Movies=res as Movie[]

    
    })

    return this.Movies
    
  }

  async getMoviesById(id:number){  //Función que obtiene Moviees según su ID

    await this.http.get(environment.api+"/Moviee/"+ id).toPromise().then(res=>{
      this.currentMovie=res as Movie
    console.log(this.currentMovie)
    
    })

    return this.currentMovie
    
  }
  
  //Envía el ID del Moviee que se va a eliminar al API
  async deleteMovie(id: number | undefined) {
    //this.Movies = this.Movies.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api+'/Moviee/'+id).toPromise().then(res=>{this.getMovies().then(result=>{this.Movies=result})})
    return this.Movies
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editMovie(Movie: Movie) {
    await this.http.put(environment.api+"/Moviee", Movie).toPromise().then(res=>{this.getMovies().then(result=>{this.Movies=result})})
    return this.Movies
  }

  //Envía los datos de un nuevo Moviee al API
  async addMovie(Movie : Movie){
    const body = {}
    await this.http.post(environment.api+"/Moviee", Movie).toPromise().then(res=>{this.getMovies().then(result=>{this.Movies=result})})
    return this.Movies;
  }
}
