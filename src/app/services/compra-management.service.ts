import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Models/movie.Model';
import { Location } from 'src/app/Models/location.Model';
import { Proyeccion } from '../Models/proyeccion.Model';

@Injectable({
  providedIn: 'root'
})
export class CompraManagementService {

  locations: Location [] = []
  movies: Movie [] = []
  proyecciones: Proyeccion [] = []
  seats: number [] = []
  constructor(private http: HttpClient) { }

  async getLocations(){

    await this.http.get(environment.api+"/locations/").toPromise().then(res=>{
      this.locations=res as Location[]

    
    })

    return this.locations

   }

  async getMovies(id:number){

    await this.http.get(environment.api+"/movies/"+id).toPromise().then(res=>{
      this.movies=res as Movie[]

    
    })

    return this.movies
    
  }

  async getProyecciones(id:number){

    await this.http.get(environment.api+"/proyecciones/"+id).toPromise().then(res=>{
      this.proyecciones=res as Proyeccion[]

    
    })

    return this.proyecciones
    
  }
  async getSeats(id:number){

    await this.http.get(environment.api+"/seats/"+id).toPromise().then(res=>{
      this.seats=res as number[]

    
    })

    return this.seats
    
  }




}
