import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleado } from '../Models/empleado.Model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoManagementService {

  empleados: Empleado[] = []
  currentempleado: Empleado ={
    nombre: "",
    apellido1: "",
    apellido2: "",
    cedula: 0,
    telefono: 0,
    fechaDeNacimiento: new Date(),
    edad: 0,
    fechaDeIngreso: new Date(),
    rol: "",
    usuario: "",
    contrasena: 0
    
  }
  constructor(public http:HttpClient) { }
  /**
   * 
   * @returns 
   */
  async getempleados(){  //Función que obtiene empleadoes

    await this.http.get(environment.api+"/empleado").toPromise().then(res=>{
      this.empleados=res as Empleado[]

    
    })

    return this.empleados
    
  }

  async getempleadosById(id:number){  //Función que obtiene empleadoes según su ID

    await this.http.get(environment.api+"/empleado/"+ id).toPromise().then(res=>{
      this.currentempleado=res as Empleado
    console.log(this.currentempleado)
    
    })

    return this.currentempleado
    
  }
  
  //Envía el ID del empleadoe que se va a eliminar al API
  async deleteempleado(id: number | undefined) {
    //this.empleados = this.empleados.filter((obj) => obj.cedula !== id);
    await this.http.delete(environment.api+'/empleado/'+id).toPromise().then(res=>{this.getempleados().then(result=>{this.empleados=result})})
    return this.empleados
  }

  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editempleado(empleado: Empleado) {
    await this.http.put(environment.api+"/empleado", empleado).toPromise().then(res=>{this.getempleados().then(result=>{this.empleados=result})})
    return this.empleados
  }

  //Envía los datos de un nuevo empleadoe al API
  async addempleado(empleado : Empleado){
    const body = {}
    await this.http.post(environment.api+"/empleado", empleado).toPromise().then(res=>{this.getempleados().then(result=>{this.empleados=result})})
    return this.empleados;
  }
}
