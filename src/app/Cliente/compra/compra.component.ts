import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/Models/compra.Model';
import { Movie } from 'src/app/Models/movie.Model';
import { Proyeccion } from 'src/app/Models/proyeccion.Model';
import { Location } from 'src/app/Models/location.Model';
import { CompraManagementService } from 'src/app/services/compra-management.service';
import { Sala } from 'src/app/Models/sala.Model';
import { ProyeccionManagementService } from 'src/app/services/proyeccion-management.service';
import { SalaManagementService } from 'src/app/services/sala-management.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  selectedLocation: String | undefined = ""
  selectedLocationID: Number | undefined = 0
  selectedMovieID: String | undefined = ""
  selectedMovie: String | undefined = ""
  selectedProyeccion: Date | undefined = new Date()
  selectedProyeccionID: Number | undefined = 0
  filas: Number | undefined = 0
  columnas:  Number | undefined = 0
  aforo:  Number | undefined = 0
  capacity: Number = 0
  rows: Number[] = []

  currentProyeccion: Proyeccion = {
    ID: 0,
    pelicula: 0,
    sala: 0,
    hora: new Date()
  }

  currentSala: Sala = {
    id: 0,
    sucursal: 0,
    filas: 0,
    columnas: 0,
    capacidad: 0
  }

  active = 1

  newCompra: Compra = {
    id: 0,
    cine: 0,
    pelicula: 0,
    proyeccion: 0,
    asientoNiño: 0,
    asientoAdulto: 0,
    asientoCiudadano: 0,
    butacas: []
  }
  locations: Location[] = []
  movies: Movie[] = []
  proyecciones: Proyeccion[] = []
  seats: number[] = []
  columns: number[] = []


  constructor(private compraService: CompraManagementService, private proyeccionService: ProyeccionManagementService,
    private salaService: SalaManagementService) { }

  ngOnInit(): void {

    this.compraService.getLocations().then(res => this.locations = res)
    this.rows= Array(4).fill(1)
    this.columns = Array(6).fill(1)
  }


  loadMovies(id: number | undefined) {
    this.compraService.getMovies(id as unknown as number).then(res => this.movies = res)
  }

  loadProyecciones(id: string | undefined) {
    this.compraService.getProyecciones(id as unknown as number).then(res => {this.proyecciones = res
    })

  }

  loadSeats(id: number | undefined) {
    this.compraService.getSeats(id as unknown as number).then(res => {this.seats = res
    //this.rows= Array(this.currentSala.filas).fill(1)
   
    })
  }

  selectLocation(nombre: string | undefined, id: number | undefined) {
    this.selectedLocation = nombre
    this.selectedLocationID = id
    this.loadMovies(id)
  }

  getCapacity(){
    this.capacity= ((this.filas as unknown as number)*(this.columnas as unknown as number))*(this.aforo as unknown as number)
  }

  selectMovie(nombre: string | undefined, id: string | undefined) {
    this.selectedMovie = nombre
    this.selectedMovieID = id
    this.loadProyecciones(id)
  }


  selectProyeccion(hora: Date | undefined, id: number | undefined) {
    this.selectedProyeccion = hora
    this.selectedProyeccionID = id
    this.proyeccionService.getproyeccionsById(id as unknown as number).then(res => this.currentProyeccion = res)
    this.salaService.getsalasById(id as unknown as number).then(res=>this.currentSala =res)
    this.loadSeats(id)
  }




}
