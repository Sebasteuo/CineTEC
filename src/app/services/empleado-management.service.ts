import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Empleado } from '../Models/empleado.Model';
import { RolXEmpleado } from '../Models/rol-xempleado.Model';
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
  constructor(public http:HttpClient, private toastr: ToastrService) { }
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
    await this.http.delete(environment.api+'/RolXempleado/'+id).toPromise().then(res2=>{
    this.http.delete(environment.api+'/empleado/'+id).toPromise().then(res=>{
      
      this.getempleados().then(result=>{this.empleados=result})})})
    return this.empleados
  }
  rolXEmpleado:RolXEmpleado ={nombre:"", cedulaempleado:0}
  //Envía los datos modificados al API (esta función se comporta igual a la que account-management.service)
  async editempleado(empleado: Empleado) {
    await this.http.put(environment.api+"/empleado", empleado).toPromise().then(res=>{
      this.rolXEmpleado.nombre=empleado.rol as unknown as string
      this.rolXEmpleado.cedulaempleado=empleado.cedulaempleado as unknown as number
      console.log(this.rolXEmpleado)
      try{ this.http.put(environment.api+"/RolXEmpleado",this.rolXEmpleado).toPromise().then(res2=>this.getempleados().then(result=>{this.empleados=result},error=>this.toastr.error("Rol Iválido","error")))}
      catch{this.toastr.error("Rol Iválido","error")}
      })
      

    return this.empleados
  }

  //Envía los datos de un nuevo empleadoe al API
  async addempleado(empleado : Empleado){
    this.rolXEmpleado.nombre = empleado.rol as unknown as string
    this.rolXEmpleado.cedulaempleado = empleado.cedulaempleado as unknown as number
    await this.http.post(environment.api+"/empleado", empleado).toPromise().then(res=>{
      console.log(this.rolXEmpleado);
      
      this.http.post(environment.api+"/RolXEmpleado", this.rolXEmpleado).toPromise().then(res2=>this.getempleados().then(result=>{this.empleados=result}))
      })
    return this.empleados;
  }

  async getroles(){  //Función que obtiene empleadoes

    await this.http.get(environment.api+"/rol").toPromise().then(res=>{
      this.roles=res as Rol[]

    
    })

    return this.roles
    
  }


  rol: Rol[]=[]
  async getrolempleado(id: number){  //Función que obtiene empleadoes

    await this.http.get(environment.api+"/RolXEmpleado/"+id).toPromise().then(res=>{
      this.rol=res as Rol[]
      console.log(this.rol)

    
    })

    return this.rol
    
  }


}
