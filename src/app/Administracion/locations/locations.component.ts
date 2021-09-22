import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/Models/location.Model';
import { LocationManagementService } from 'src/app/services/location-management.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(private LocationServices:LocationManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
newlocation: Location={
  id:0,
  nombreCine: "",
  cantidadSalas:0,
  ubicacion:""
 
  
}
selectedlocation: Location={
  id:0,
  nombreCine: "",
  cantidadSalas:0,
  ubicacion:""
}
locations: Location[]=[]
editingID: number | undefined = 0;
ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.LocationServices.getlocations().then(res=>this.locations=res);
  this.LocationServices.getlocationsById(123456789).then(res=> console.log(res));
}

//Envía el ID del locatione que se va a eliminar al servicio
delete(id : number | undefined){
    this.LocationServices.deletelocation(id).then(res=>{this.locations=res});
}

//Click en el botón de editar genera cajas de texto para escribir editables
edit(location : Location){
  this.editingID = location.id;
  this.selectedlocation = location;
}

//Envía los datos del locatione modificados, pertenece al botón de "aceptar"
submit(){
  this.editingID = 0;
  this.LocationServices.editlocation(this.selectedlocation).then(res=>{this.locations=res});
}

//Envía los datos de un nuevo locatione al servicio
add(){
  this.LocationServices.addlocation(this.newlocation).then(res=>{this.locations=res});
  this.newlocation = {
    id:0,
    nombreCine: "",
    cantidadSalas:0,
    ubicacion:""
  }
}

}
