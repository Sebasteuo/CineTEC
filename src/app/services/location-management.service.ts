import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleado } from '../Models/empleado.Model';
import { Location } from '../Models/location.Model';
import { Sala } from '../Models/sala.Model';

@Injectable({
  providedIn: 'root'
})
export class LocationManagementService {

  locations: Location[] = []
  currentlocation: Location = {
    codigosucursal: 0,
    nombre: "",
    cantidadsalas: 0,
    ubicacion: ""
  }
  salas: Sala[] = []
  empleados : Empleado[] = []
  constructor(public http: HttpClient) { }
  /**
   * 
   * @returns 
   */
  async getlocations() {  //Función que obtiene locationes
    await this.http.get(environment.api + "/sucursal").toPromise().then(res => {
      this.locations = res as Location[]
    })
    return this.locations
  }

  async getlocationsById(id: number) {  //Función que obtiene locationes según su ID
    await this.http.get(environment.api + "/sucursal/" + id).toPromise().then(res => {
      this.currentlocation = res as Location
    })
    return this.currentlocation
  }

  //Envía el ID del locatione que se va a eliminar al API
  async deletelocation(id: number | undefined) {
    await this.http.delete(environment.api + '/butaca/DeleteBySucursal/' + id).toPromise().then(res => {
      console.log("deleting butacas")
    })
    await this.http.get(environment.api + '/sala/GetSalasByLocation/' + id).toPromise().then(res => {
      this.salas = res as Sala[]
      console.log(this.salas)
      this.salas.forEach(sala => {
        console.log("deleting funciones")
        this.http.delete(environment.api + '/funcion/DeleteBySala/' + sala.salaid).toPromise().then(res => { })
      })
    })
    await this.http.get(environment.api + '/empleado/GetEmpleadoBySucursal/' + id).toPromise().then(res => {
      this.empleados = res as Empleado[]
      console.log(this.empleados)
      this.empleados.forEach(empleado => {
        console.log("deleting roles")
        this.http.delete(environment.api + '/RolXEmpleado/' + empleado.cedulaempleado).toPromise().then(res => { })
      })
    })
    await this.http.delete(environment.api + '/sala/DeleteBySucursal/' + id).toPromise().then(res2 => {
      console.log("deleting salas")
      this.http.delete(environment.api + '/empleado/DeleteBySucursal/' + id).toPromise().then(res2 => {
        console.log("deleting empleados")
        this.http.delete(environment.api + '/PeliculaXSucursal/' + id).toPromise().then(res2 => {
        this.http.delete(environment.api + '/sucursal/' + id).toPromise().then(res3 => {
          console.log("deleting sucursal " + id)
          this.getlocations().then(result => { this.locations = result })
        })})
      })
    })
    return this.locations
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editlocation(location: Location) {
    await this.http.put(environment.api + "/sucursal", location).toPromise().then(res => { this.getlocations().then(result => { this.locations = result }) })
    return this.locations
  }

  //Envía los datos de un nuevo locatione al API
  async addlocation(location: Location) {
    await this.http.post(environment.api + "/sucursal", location).toPromise().then(res => {
      this.getlocations().then(result => {
        this.locations = result
      })
    })
    return this.locations;
  }
}



