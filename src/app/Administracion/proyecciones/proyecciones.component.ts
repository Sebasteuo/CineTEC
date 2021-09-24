import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Proyeccion } from 'src/app/Models/proyeccion.Model';
import { ProyeccionManagementService } from 'src/app/services/proyeccion-management.service';

@Component({
  selector: 'app-proyecciones',
  templateUrl: './proyecciones.component.html',
  styleUrls: ['./proyecciones.component.scss']
})
export class ProyeccionesComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  constructor(private proyeccionServices:ProyeccionManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newproyeccion: Proyeccion={
  ID:0,
    pelicula: 0,
    sala: 0,
    hora: new Date()
 
  
}
selectedproyeccion: Proyeccion={
  ID:0,
    pelicula: 0,
    sala: 0,
    hora: new Date()
}
proyeccions: Proyeccion[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.proyeccionServices.getproyeccions().then(res=>this.proyeccions=res);
  this.proyeccionServices.getproyeccionsById(123456789).then(res=> console.log(res));
}

//Envía el ID del proyeccione que se va a eliminar al servicio
delete(id : number | undefined){
    this.proyeccionServices.deleteproyeccion(id).then(res=>{this.proyeccions=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(proyeccion : Proyeccion){
  this.editingID = proyeccion.ID;
  this.selectedproyeccion = proyeccion;
}

//Envía los datos del proyeccione modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.proyeccionServices.editproyeccion(this.selectedproyeccion).then(res=>{this.proyeccions=res});
}

//Envía los datos de un nuevo proyeccione al servicio
add(){
  this.proyeccionServices.addproyeccion(this.newproyeccion).then(res=>{this.proyeccions=res});
  this.newproyeccion = {
    ID:0,
    pelicula: 0,
    sala: 0,
    hora: new Date()
  }
}

}
