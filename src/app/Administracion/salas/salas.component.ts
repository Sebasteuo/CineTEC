import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/Models/sala.Model';
import { SalaManagementService } from 'src/app/services/sala-management.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.scss']
})
export class SalasComponent implements OnInit {

  constructor(private salaServices:SalaManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newsala: Sala={
  id:  0,
  sucursal:  0,
  filas: 0,
  columnas: 0,
  capacidad: 0
 
  
}
selectedsala: Sala={
  id:  0,
  sucursal:  0,
  filas: 0,
  columnas: 0,
  capacidad: 0
}
salas: Sala[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.salaServices.getsalas().then(res=>this.salas=res);
  this.salaServices.getsalasById(123456789).then(res=> console.log(res));
}

//Envía el ID del salae que se va a eliminar al servicio
delete(id : number | undefined){
    this.salaServices.deletesala(id).then(res=>{this.salas=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(sala : Sala){
  this.editingID = sala.id;
  this.selectedsala = sala;
}

//Envía los datos del salae modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.salaServices.editsala(this.selectedsala).then(res=>{this.salas=res});
}

//Envía los datos de un nuevo salae al servicio
add(){
  this.salaServices.addsala(this.newsala).then(res=>{this.salas=res});
  this.newsala = {
    id:  0,
    sucursal:  0,
    filas: 0,
    columnas: 0,
    capacidad: 0
  }
}
}
