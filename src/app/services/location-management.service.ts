import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../Models/location.Model';

@Injectable({
  providedIn: 'root'
})
export class LocationManagementService {

  locations: Location[] = []
  currentlocation: Location ={
    id:0,
    nombreCine: "",
    cantidadSalas:0,
    ubicacion:""
  }
  constructor(public http:HttpClient) { }
  /**
   * 
   * @returns 
   */
  async getlocations(){  //Función que obtiene locationes

    await this.http.get(environment.api+"/location").toPromise().then(res=>{
      this.locations=res as Location[]

    
    })

    return this.locations
    
  }

  async getlocationsById(id:number){  //Función que obtiene locationes según su ID

    await this.http.get(environment.api+"/locatione/"+ id).toPromise().then(res=>{
      this.currentlocation=res as Location
    console.log(this.currentlocation)
    
    })

    return this.currentlocation
    
  }
  
  //Envía el ID del locatione que se va a eliminar al API
  async deletelocation(id: number | undefined) {
    //this.locations = this.locations.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api+'/locatione/'+id).toPromise().then(res=>{this.getlocations().then(result=>{this.locations=result})})
    return this.locations
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editlocation(location: Location) {
    await this.http.put(environment.api+"/locatione", location).toPromise().then(res=>{this.getlocations().then(result=>{this.locations=result})})
    return this.locations
  }

  //Envía los datos de un nuevo locatione al API
  async addlocation(location : Location){
    const body = {}
    await this.http.post(environment.api+"/locatione", location).toPromise().then(res=>{this.getlocations().then(result=>{this.locations=result})})
    return this.locations;
  }
}
