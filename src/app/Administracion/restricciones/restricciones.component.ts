import { Component, OnInit } from '@angular/core';
import { Aforo } from 'src/app/Models/aforo.Model';
import { SalaManagementService } from 'src/app/services/sala-management.service';

@Component({
  selector: 'app-restricciones',
  templateUrl: './restricciones.component.html',
  styleUrls: ['./restricciones.component.scss']
})
export class RestriccionesComponent implements OnInit {

  
  constructor(private aforoServices: SalaManagementService) {
    //Servicios se deben invocar acá
    //VARIABLES. SINTAXIS= Nombre:Tipo = Valor
 }
aforo: Aforo={
  porcentaje:0
 
  
}


ngOnInit(): void { //Función que se ejecuta de primero cuando carga componentes
  
  this.aforoServices.getaforo().then(res=>this.aforo.porcentaje=res);
 
}



//Envía los datos del aforoe modificados, pertenece al botón de "aceptar"
submit(){
  this.aforoServices.editaforo(this.aforo.porcentaje as unknown as number).then(res=>{this.aforo.porcentaje=res});
}

}


