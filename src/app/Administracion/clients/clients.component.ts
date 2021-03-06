import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from 'src/app/Models/client.Model';
import { ClientManagementService } from 'src/app/services/client-management.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  constructor(private clientServices:ClientManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newClient: Client={
  nombrecliente1:"",
    nombrecliente2:"",
    apellidocliente1:"",
    apellidocliente2:"",
    cedulaempleado:0,
    fechanacimiento:new Date(),
    numerotelefono:0,
    cedulacliente:0,
    usuario: "",
    contrasenna: ""
 
  
}
selectedClient: Client={
 
  nombrecliente1:"",
    nombrecliente2:"",
    apellidocliente1:"",
    apellidocliente2:"",
    cedulaempleado:0,
    fechanacimiento:new Date(),
    numerotelefono:0,
    cedulacliente:0,
    usuario: "",
    contrasenna: ""
}
clients: Client[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.clientServices.getClients().then(res=>this.clients=res);
  this.clientServices.getClientsById(123456789).then(res=> console.log(res));
}

//Envía el ID del cliente que se va a eliminar al servicio
delete(id : number | undefined){
    this.clientServices.deleteClient(id).then(res=>{this.clients=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(client : Client){
  this.editingID = client.cedulacliente;
  this.selectedClient = client;
}

//Envía los datos del cliente modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.clientServices.editClient(this.selectedClient).then(res=>{this.clients=res});
}

//Envía los datos de un nuevo cliente al servicio
add(){

  this.clientServices.addClient(this.newClient).then(res=>{this.clients=res});
  this.newClient = {
    nombrecliente1:"",
    nombrecliente2:"",
    apellidocliente1:"",
    apellidocliente2:"",
    cedulaempleado:0,
    fechanacimiento:new Date(),
    numerotelefono:0,
    cedulacliente:0,
    usuario: "",
    contrasenna: ""
  }
}

}
