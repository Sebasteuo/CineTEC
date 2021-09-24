import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Empleado } from 'src/app/Models/empleado.Model';
import { EmpleadoManagementService } from 'src/app/services/empleado-management.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  constructor(private empleadoServices:EmpleadoManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newempleado: Empleado={
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
    contrasena: 0,
   
 
 
  
}
selectedempleado: Empleado={
 
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
    contrasena: 0,
}
empleados: Empleado[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.empleadoServices.getempleados().then(res=>this.empleados=res);
  this.empleadoServices.getempleadosById(123456789).then(res=> console.log(res));
}

//Envía el ID del empleadoe que se va a eliminar al servicio
delete(id : number | undefined){
    this.empleadoServices.deleteempleado(id).then(res=>{this.empleados=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(empleado : Empleado){
  this.editingID = empleado.cedula;
  this.selectedempleado = empleado;
}

//Envía los datos del empleadoe modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.empleadoServices.editempleado(this.selectedempleado).then(res=>{this.empleados=res});
}

//Envía los datos de un nuevo empleadoe al servicio
add(){
  this.empleadoServices.addempleado(this.newempleado).then(res=>{this.empleados=res});
  this.newempleado = {
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
    contrasena: 0,
  }
}

}
