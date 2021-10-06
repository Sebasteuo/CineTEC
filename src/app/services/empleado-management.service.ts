import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleado } from '../Models/empleado.Model';
import { Rol } from '../Models/rol.Model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoManagementService {
  roles: Rol[] = []
  empleados: Empleado[] = []
  currentempleado: Empleado ={
    nombreempleado1: "",
    nombreempleado2: "",
    apellidoempleado1: "",
    apellidoempleado2: "",
    cedulaempleado: 0,
    numerotelefono: 0,
    fechanacimiento: new Date(),
    fechaingreso: new Date(),
    rol: "",
    usuario: "",
    contrasenna: 0
    
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

  async getroles(){  //Función que obtiene empleadoes

    await this.http.get(environment.api+"/rol").toPromise().then(res=>{
      this.roles=res as Rol[]

    
    })

    return this.roles
    
  }


  async getrolempleado(id: number){  //Función que obtiene empleadoes

    var rol
    await this.http.get(environment.api+"/rol/"+id).toPromise().then(res=>{
      rol=res as Rol
      console.log(rol)

    
    })

    return rol
    
  }


}
