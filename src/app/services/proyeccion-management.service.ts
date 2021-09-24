import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proyeccion } from '../Models/proyeccion.Model';
import { Sala } from '../Models/sala.Model';

@Injectable({
  providedIn: 'root'
})
export class ProyeccionManagementService {

  proyeccions: Proyeccion[] = []
  currentproyeccion: Proyeccion ={
    ID:0,
    pelicula: 0,
    sala: 0,
    hora: new Date()
  }
  constructor(public http:HttpClient) { }
  /**
   * 
   * @returns 
   */
  async getproyeccions(){  //Función que obtiene proyecciones

    await this.http.get(environment.api+"/proyeccion").toPromise().then(res=>{
      this.proyeccions=res as Proyeccion[]

    
    })

    return this.proyeccions
    
  }

  async getproyeccionsById(id:number){  //Función que obtiene proyecciones según su ID

    await this.http.get(environment.api+"/proyeccione/"+ id).toPromise().then(res=>{
      this.currentproyeccion=res as Proyeccion
    console.log(this.currentproyeccion)
    
    })

    return this.currentproyeccion
    
  }
  
  //Envía el ID del proyeccione que se va a eliminar al API
  async deleteproyeccion(id: number | undefined) {
    //this.proyeccions = this.proyeccions.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api+'/proyeccione/'+id).toPromise().then(res=>{this.getproyeccions().then(result=>{this.proyeccions=result})})
    return this.proyeccions
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editproyeccion(proyeccion: Proyeccion) {
    await this.http.put(environment.api+"/proyeccione", proyeccion).toPromise().then(res=>{this.getproyeccions().then(result=>{this.proyeccions=result})})
    return this.proyeccions
  }

  //Envía los datos de un nuevo proyeccione al API
  async addproyeccion(proyeccion : Proyeccion){
    const body = {}
    await this.http.post(environment.api+"/proyeccione", proyeccion).toPromise().then(res=>{this.getproyeccions().then(result=>{this.proyeccions=result})})
    return this.proyeccions;
  }
}
