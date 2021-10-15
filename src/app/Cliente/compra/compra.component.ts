import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/Models/compra.Model';
import { Movie } from 'src/app/Models/movie.Model';
import { Proyeccion } from 'src/app/Models/proyeccion.Model';
import { Location } from 'src/app/Models/location.Model';
import { CompraManagementService } from 'src/app/services/compra-management.service';
import { Sala } from 'src/app/Models/sala.Model';
import { ProyeccionManagementService } from 'src/app/services/proyeccion-management.service';
import { SalaManagementService } from 'src/app/services/sala-management.service';
import { ButacaXfuncion } from 'src/app/Models/butaca-xfuncion.model';
import { Butaca } from 'src/app/Models/butaca.model';
import { Factura } from 'src/app/Models/factura.model';
import { FacturacionManagementService } from 'src/app/services/facturacion-management.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  selectedLocation: String | undefined = "Click para expandir"
  selectedLocationID: Number | undefined = 0
  selectedMovieID: String | undefined = ""
  selectedMovie: String | undefined = ""
  selectedProyeccion: Date | undefined = new Date()
  selectedProyeccionID: Number | undefined = 0
  filas: Number | undefined = 0
  columnas: Number | undefined = 0
  aforo: Number | undefined = 0
  capacity: Number = 0
  rows: Number[] = []
  butacas: Butaca[]=[]
  newFactura: Factura = {monto:0,
    nombre:"",
    telefono:0,
    correoelectronico:"",
    identificacion:0,
    funcionid:"",
    facturaid:0,
    numerodeasiento:1,
    provincia:"",
    canton:"",
    distrito:""}

  currentProyeccion: Proyeccion = {
    funcionid: 0,
    peliid: 0,
    salaid: 0,
    hora: new Date()
  }

  currentSala: Sala = {
    salaid: "",
    codigosucursal: "",
    fila: 0,
    columna: 0,
    capacidad: 0
  }

  active = 1
  fileURL: SafeResourceUrl = ""
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
  seats: ButacaXfuncion[] = []
  columns: number[] = []
  selectedButaca: number = 0


  constructor(private compraService: CompraManagementService, private proyeccionService: ProyeccionManagementService,
    private salaService: SalaManagementService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.compraService.getLocations().then(res => this.locations = res)
    this.rows = Array(4).fill(1)
    this.columns = Array(6).fill(1)
  }

  loadMovies(id: number | undefined) {
    this.compraService.getMovies(id as unknown as string).then(res => {
      this.movies = []
      this.proyecciones = []
      this.movies = res
    })
  }

  pay(){
    this.newFactura.numerodeasiento = this.selectedButaca
    this.newFactura.funcionid = this.selectedProyeccionID as unknown as string
    this.newFactura.monto = 1200
    this.compraService.purchase(this.selectedLocation as unknown as string,this.currentSala.salaid,
       this.selectedProyeccion as unknown as string, this.selectedMovie as unknown as string, this.newFactura, 
       this.selectedProyeccionID as unknown as string).then(res=>{
        console.log("purchase")
         console.log(res)
        const blob = new Blob([res], { type: 'application/octet-stream' });

        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
       })

    
      
  
  }

  loadProyecciones(id: string | undefined) {
    this.proyecciones = []
    this.compraService.getProyecciones(id as unknown as string).then(res => {
      this.proyecciones = res
    })


  }

  loadSeats(id: number | undefined) {
    this.rows = Array(this.currentSala.fila).fill(1)
    this.columns = Array(this.currentSala.columna).fill(1)
    this.compraService.getSeats(id as unknown as number).then(res => {
      this.seats = res
      console.log(this.seats)
    })
    this.compraService.getButacasBySala(this.currentSala.salaid as unknown as string).then(res => {this.butacas = res 
      console.log(this.butacas)
    })
    
  }

  selectLocation(nombre: string | undefined, id: number | undefined) {
    this.selectedLocation = nombre
    this.selectedLocationID = id
    this.loadMovies(id)
  }

  getCapacity() {
    this.capacity = ((this.filas as unknown as number) * (this.columnas as unknown as number)) * (this.aforo as unknown as number)
  }

  selectMovie(nombre: string | undefined, id: string | undefined) {
    this.selectedMovie = nombre
    this.selectedMovieID = id
    this.loadProyecciones(id)
  }

  selectProyeccion(hora: Date | undefined, id: number | undefined) {
    this.selectedProyeccion = hora
    this.selectedProyeccionID = id
    this.proyeccionService.getproyeccionsById(id as unknown as number).then(res => {
      this.currentProyeccion = res
      this.salaService.getsalasById(res.salaid as unknown as string).then(res2 => {
        this.currentSala = res2
        this.loadSeats(id)
      })
    })
  }

  selectSeat(i: number, j: number) {
    var image = document.getElementById('loc' + j + i) as HTMLImageElement;
    if (image.src.match("../assets/Img/asientoVerde.png")) {
      image.src = "../assets/Img/asientoRojo.png";
    }
    else {
      image.src = "../assets/Img/asientoVerde.png";
    }
    console.log('loc' + j + i)
  }
}


