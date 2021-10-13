import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aforo } from '../Models/aforo.Model';
import { Sala } from '../Models/sala.Model';

@Injectable({
  providedIn: 'root'
})
export class SalaManagementService {

  aforo: number = 100
  salas: Sala[] = []
  currentsala: Sala = {
    salaid: "",
    codigosucursal: "",
    fila: 0,
    columna: 0,
    capacidad: 0
  }
  
  constructor(public http: HttpClient) { }

  async getsalas() {  //Función que obtiene salaes
    await this.http.get(environment.api + "/sala").toPromise().then(res => {
      this.salas = res as Sala[]
    })
    return this.salas
  }

  async getaforo() {  //Función que obtiene salaes
    await this.http.get(environment.api + "/aforo").toPromise().then(res => {
      this.aforo = res as number
    })
    return this.aforo
  }

  async getsalasById(id: string) {  //Función que obtiene salaes según su ID
    await this.http.get(environment.api + "/sala/" + id).toPromise().then(res => {
      this.currentsala = (res as Sala[])[0]
    })
    return this.currentsala
  }

  //Envía el ID del salae que se va a eliminar al API
  async deletesala(id: string | undefined) {
    //this.salas = this.salas.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api + '/Funcion/' + id).toPromise().then(res => {
      this.http.delete(environment.api + '/sala/' + id).toPromise().then(res => {
        this.getsalas().then(result => { this.salas = result })
      })
    })
    return this.salas
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editsala(sala: Sala) {
    await this.http.put(environment.api + "/sala", sala).toPromise().then(res => { this.getsalas().then(result => { this.salas = result }) })
    return this.salas
  }


  async editaforo(aforo: number) {
    await this.http.put(environment.api + "/aforo", aforo).toPromise().then(res => { this.getaforo().then(result => { this.aforo = result }) })
    return this.aforo
  }

  //Envía los datos de un nuevo salae al API
  async addsala(sala: Sala) {
    await this.http.post(environment.api + "/sala", sala).toPromise().then(res => { this.getsalas().then(result => { this.salas = result }) })
    return this.salas;
  }
}



