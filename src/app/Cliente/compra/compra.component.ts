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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jsPDF } from "jspdf";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  selectedLocation: String | undefined = "Click para expandir"
  selectedLocationID: Number | undefined = 0
  selectedMovieID: String | undefined = ""
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
  selectedProyeccion: Date | undefined = new Date()
  selectedProyeccionID: Number | undefined = 0
  filas: Number | undefined = 0
  columnas: Number | undefined = 0
  aforo: Number | undefined = 0
  capacity: Number = 0
  rows: Number[] = []
  selectedTipoBoleto: string = "Seleccione un tipo de boleto"
  selectedPrecio: Number = 0
  boletos: string[] = ["Adulto", "Niño", "Ciudadano de Oro"]
  butacas: Butaca[] = []
  newFactura: Factura = {
    monto: 0,
    nombre: "",
    telefono: 0,
    correoelectronico: "",
    identificacion: 0,
    funcionid: "",
    facturaid: 0,
    numerodeasiento: 1,
    provincia: "",
    canton: "",
    distrito: ""
  }

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
  doc = new jsPDF({ putOnlyUsedFonts: true })

  constructor(private compraService: CompraManagementService, private proyeccionService: ProyeccionManagementService,
    private salaService: SalaManagementService, private sanitizer: DomSanitizer, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.compraService.getLocations().then(res => this.locations = res)
    this.rows = Array(10).fill(1)
    this.columns = Array(10).fill(1)
  }

  loadMovies(sucursalid: number | undefined) {
    this.compraService.getMovies(sucursalid as unknown as string).then(res => {
      this.movies = []
      this.proyecciones = []
      this.movies = res
    })
  }

  pay() {
    this.newFactura.numerodeasiento = this.selectedButaca
    this.newFactura.funcionid = this.selectedProyeccionID as unknown as string
    this.newFactura.monto = this.selectedPrecio as unknown as number
    this.newFactura.numerodeasiento = this.selectedButaca
    this.compraService.purchase(this.selectedLocation as unknown as string, this.currentSala.salaid,
      this.selectedProyeccion as unknown as string, this.selectedMovie.nombre as unknown as string, this.newFactura,
      this.selectedProyeccionID as unknown as string).then(res => {
        this.newFactura = res
      })
    this.compraService.getXML(this.selectedLocation as unknown as string, this.currentSala.salaid,
      this.selectedProyeccion as unknown as string, this.selectedMovie.nombre as unknown as string, this.newFactura).then(res => {
        const blob = new Blob([res], { type: 'application/octet-stream' });
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      })
    this.compraService.getPDF(this.selectedLocation as unknown as string, this.currentSala.salaid,
      this.selectedProyeccion as unknown as string, this.selectedMovie.nombre as unknown as string, this.newFactura).then(res => { this.doc = res });
  }

  downloadPDF() {
    this.doc.save("factura.pdf")
  }

  loadProyecciones(peliid: string | undefined) {
    this.proyecciones = []
    this.compraService.getProyecciones(peliid as unknown as string).then(res => {
      this.proyecciones = res
    })
  }

  async loadSeats(id: number | undefined) {
    console.log(id)
    await this.proyeccionService.getproyeccionsById(id as unknown as number).then(res => {
      this.salaService.getsalasById(res.salaid as unknown as string).then(res2 => {
        this.currentSala = res2
        this.rows = Array(this.currentSala.fila - 1).fill(1)
        this.columns = Array(this.currentSala.columna - 1).fill(1)
        this.compraService.getSeats(id as unknown as number).then(res3 => {
          this.seats = res3
        })
      })
    })
    return this.seats

  }

  selectLocation(nombre: string | undefined, id: number | undefined) {
    this.selectedLocation = nombre
    this.selectedLocationID = id
    this.loadMovies(id)
  }
  selectTipoBoleto(nombre: string) {
    this.selectedTipoBoleto = nombre
    if (nombre == "Adulto")
      this.selectedPrecio = this.selectedMovie.precioadulto as unknown as number
    else if (nombre == "Niño")
      this.selectedPrecio = this.selectedMovie.precioninos as unknown as number
    else
      this.selectedPrecio = this.selectedMovie.preciocidoro as unknown as number

    this.loadSeats(this.currentProyeccion.funcionid).then(res => {
      this.seats.forEach(seat => {
        console.log(seat)
        try {
          if (seat.numerodeasiento < 10) {
            var image = document.getElementById('loc0' + seat.numerodeasiento) as HTMLImageElement;
            image.src = "../assets/Img/asientoGris.png";
          }
          else{
            var image = document.getElementById('loc' + seat.numerodeasiento) as HTMLImageElement;
            image.src = "../assets/Img/asientoGris.png";
          }
        }
        catch {
          console.log("catch")
        }
      })
      console.log(this.seats)
    })
  }

  getCapacity() {
    this.capacity = ((this.filas as unknown as number) * (this.columnas as unknown as number)) * (this.aforo as unknown as number)
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie
    this.selectedMovieID = movie.peliid
    this.loadProyecciones(movie.peliid)
  }

  selectProyeccion(hora: Date | undefined, id: number | undefined) {
    this.selectedProyeccion = hora
    this.selectedProyeccionID = id
    this.proyeccionService.getproyeccionsById(id as unknown as number).then(res => {
      this.currentProyeccion = res
    })
  }


  selectSeat(i: number, j: number) {
    var image = document.getElementById('loc' + i + j) as HTMLImageElement;
    //var previosSeat = document.getElementById('loc' + this.selectedButaca) as HTMLImageElement;
    if (image.src.match("../assets/Img/asientoVerde.png")) {
     // previosSeat.src = "../assets/Img/asientoVerde.png";
      image.src = "../assets/Img/asientoRojo.png";
      this.selectedButaca = i*10 + j;
      console.log(this.selectedButaca)
    }
    else if(image.src.match("../assets/Img/asientoGris.png")){
      this.toastr.warning("Asiento reservado")
    }
    else {
      image.src = "../assets/Img/asientoVerde.png";
      
      
    }
  }
}




