import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie.Model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {


  constructor(private MovieServices:MoviesService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newMovie: Movie={
  nombre:"",
  protagonistas: [],
  director:"",
  duracion:"",
  clasificacion:"",
  imagen:"",
  id:0,
  priceChildren:0,
  priceAdult:0,
  priceGoldenCitizen:0
 
  
}
selectedMovie: Movie={
 
  nombre:"",
  protagonistas: [],
  director:"",
  duracion:"",
  clasificacion:"",
  imagen:"",
  id:0,
  priceChildren:0,
  priceAdult:0,
  priceGoldenCitizen:0
}
Movies: Movie[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.MovieServices.getMovies().then(res=>this.Movies=res);
  this.MovieServices.getMoviesById(123456789).then(res=> console.log(res));
}

//Envía el ID del Moviee que se va a eliminar al servicio
delete(id : number | undefined){
    this.MovieServices.deleteMovie(id).then(res=>{this.Movies=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(Movie : Movie){
  this.editingID = Movie.id;
  this.selectedMovie = Movie;
}

//Envía los datos del Moviee modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.MovieServices.editMovie(this.selectedMovie).then(res=>{this.Movies=res});
}

//Envía los datos de un nuevo Moviee al servicio
add(){
  this.MovieServices.addMovie(this.newMovie).then(res=>{this.Movies=res});
  this.newMovie = {
    nombre:"",
  protagonistas: [],
  director:"",
  duracion:"",
  clasificacion:"",
  imagen:"",
  id:0,
  priceChildren:0,
  priceAdult:0,
  priceGoldenCitizen:0
  }
}

}
