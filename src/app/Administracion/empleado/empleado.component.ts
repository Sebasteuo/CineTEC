import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Empleado } from 'src/app/Models/empleado.Model';
import { Rol } from 'src/app/Models/rol.Model';
import { EmpleadoManagementService } from 'src/app/services/empleado-management.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  roles: Rol[] = []
  selectedRol: string | undefined
  constructor(private empleadoServices:EmpleadoManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newempleado: Empleado={

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
selectedempleado: Empleado={
 

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
empleados: Empleado[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.empleadoServices.getempleados().then(res=>{this.empleados=res
  this.empleados.forEach((empleado,index)=>{
    this.empleadoServices.getrolempleado(empleado.cedulaempleado as unknown as number).then(response =>{
      this.empleados[index].rol = response[0].nombre})

})
  });

  
  this.empleadoServices.getroles().then(res=> this.roles = res);
}

//Envía el ID del empleadoe que se va a eliminar al servicio
delete(id : number | undefined){
    this.empleadoServices.deleteempleado(id).then(res=>{this.empleados=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(empleado : Empleado){
  this.editingID = empleado.cedulaempleado;
  this.selectedempleado = empleado;
}

//Envía los datos del empleadoe modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.empleadoServices.editempleado(this.selectedempleado).then(res=>{this.empleados=res});
}

//Envía los datos de un nuevo empleadoe al servicio
add(){
  this.newempleado.rol = this.selectedRol
  this.empleadoServices.addempleado(this.newempleado).then(res=>{this.empleados=res});
  this.newempleado = {
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
}

selectRol(nombre: string | undefined) {
  this.selectedRol = nombre
}

}
