import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatISO } from 'date-fns';
import { environment } from 'src/environments/environment';
import { Proyeccion } from '../Models/proyeccion.Model';
import { Sala } from '../Models/sala.Model';

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
  constructor(public http: HttpClient) { }

  async getproyeccions() {  //Función que obtiene proyecciones
    await this.http.get(environment.api + "/funcion").toPromise().then(res => {
      this.proyeccions = res as Proyeccion[]
    })
    return this.proyeccions
  }

  async getproyeccionsById(id: number) {  //Función que obtiene proyecciones según su ID
    await this.http.get(environment.api + "/funcion/" + id).toPromise().then(res => {
      this.currentproyeccion = res as Proyeccion
      console.log(this.currentproyeccion)
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
      hora: formatISO(proyeccion.hora),
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
    await this.http.post(environment.api + "/funcion", body).toPromise().then(res => {
      this.getproyeccions().then(result => {
        this.proyeccions = result
      })
    })
    return this.proyeccions;
  }
}






