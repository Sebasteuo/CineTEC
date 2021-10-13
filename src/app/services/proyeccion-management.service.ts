import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatISO, parseISO } from 'date-fns';
import { environment } from 'src/environments/environment';
import { PeliculaXSucursal } from '../Models/pelicula-xsucursal.model';
import { Proyeccion } from '../Models/proyeccion.Model';
import { Sala } from '../Models/sala.Model';
import { SalaManagementService } from 'src/app/services/sala-management.service';

@Injectable({
  providedIn: 'root'
})
export class ProyeccionManagementService {

  proyeccions: Proyeccion[] = []
  currentproyeccion: Proyeccion = {
    funcionid: 0,
    peliid: 0,
    salaid: 0,
    hora: new Date()
  }
  newPeliculaXsucursal: PeliculaXSucursal = {
    peliid: "",
    codigosucursal: ""
  }
  currentSala: Sala = {
    salaid: "",
    codigosucursal: "",
    fila: 0,
    columna: 0,
    capacidad: 0
  }
  constructor(public http: HttpClient, private salaService: SalaManagementService) { }

  async getproyeccions() {  //Función que obtiene proyecciones
    await this.http.get(environment.api + "/funcion").toPromise().then(res => {
      this.proyeccions = res as Proyeccion[]
    })
    return this.proyeccions
  }

  async getproyeccionsById(id: number) {  //Función que obtiene proyecciones según su ID
    await this.http.get(environment.api + "/funcion/" + id).toPromise().then(res => {
      this.currentproyeccion = (res as Proyeccion[])[0]
    })
    return this.currentproyeccion
  }

  //Envía el ID del proyeccione que se va a eliminar al API
  async deleteproyeccion(id: number | undefined) {
    await this.http.delete(environment.api + '/funcion/' + id).toPromise().then(res => { this.getproyeccions().then(result => { this.proyeccions = result }) })
    return this.proyeccions
  }

  //Envía el ID del proyeccione que se va a eliminar al API
  async deleteProyeccionBySala(id: number | undefined) {
    await this.http.delete(environment.api + '/funcion/DeleteBySala/' + id).toPromise().then(res => {
      this.getproyeccions().then(result => {
        this.proyeccions = result
      })
    })
    return this.proyeccions
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editproyeccion(proyeccion: Proyeccion) {
    const body = {
      funcionid: proyeccion.funcionid,
      peliid: proyeccion.peliid,
      salaid: proyeccion.salaid,
      hora: formatISO(parseISO(proyeccion.hora.toString())),
    }
    await this.http.put(environment.api + "/funcion", body).toPromise().then(res => { this.getproyeccions().then(result => { this.proyeccions = result }) })
    return this.proyeccions
  }

  //Envía los datos de un nuevo proyeccione al API
  async addproyeccion(proyeccion: Proyeccion) {
    const body = {
      funcionid: proyeccion.funcionid,
      peliid: proyeccion.peliid,
      salaid: proyeccion.salaid,
      hora: formatISO(proyeccion.hora),
    }
    await this.salaService.getsalasById(proyeccion.salaid as unknown as string).then(res => {
      console.log(res)
      this.newPeliculaXsucursal.peliid = proyeccion.peliid as unknown as string
      this.newPeliculaXsucursal.codigosucursal = res.codigosucursal as unknown as string
      console.log(this.newPeliculaXsucursal)
    })
    await this.http.post(environment.api + "/funcion", body).toPromise().then(res => {
      console.log(this.newPeliculaXsucursal.codigosucursal)
      this.http.post(environment.api + "/PeliculaXSucursal", this.newPeliculaXsucursal).toPromise().then(res5 => {
        this.getproyeccions().then(result => {
          this.proyeccions = result
        })
      })
    })

    return this.proyeccions;
  }
}







