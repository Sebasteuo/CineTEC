import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie.Model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {


  constructor(private MovieServices: MoviesService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
  }
  newMovie: Movie = {
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
  selectedMovie: Movie = {
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
  Movies: Movie[] = []
  editingID: string | undefined = "";
  ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes

    this.MovieServices.getMovies().then(res => {
      this.Movies = res
      this.Movies.forEach((movie, index) => {
        this.MovieServices.getDirectorById(movie.peliid as unknown as string).then(response => {
          this.Movies[index].director = response[0].nombredirector
        })
        this.MovieServices.getProtagonistaById(movie.peliid as unknown as string).then(response => {
          this.Movies[index].protagonistas = response[0].nombreprotagonista
        })
        this.MovieServices.getClasificacionById(movie.peliid as unknown as string).then(response => {
          this.Movies[index].clasificacion = response[0].descripcion
        })
      })
    });
  }

  //Envía el ID del Moviee que se va a eliminar al servicio
  delete(id: string | undefined) {
    this.MovieServices.deleteMovie(id).then(res => { this.Movies = res });
  }

  //Click en el botón de editar genera cajas de texto para escribir editables
  edit(Movie: Movie) {
    this.editingID = Movie.peliid;
    this.selectedMovie = Movie;
  }

  //Envía los datos del Moviee modificados, pertenece al botón de "aceptar"
  submit() {
    this.editingID = "";
    this.MovieServices.editMovie(this.selectedMovie).then(res => { this.Movies = res });
  }

  //Envía los datos de un nuevo Moviee al servicio
  add() {
    this.MovieServices.addMovie(this.newMovie).then(res => { this.Movies = res });
    this.newMovie = {
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
  }

}





