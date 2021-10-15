import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json2xml, xml2json } from 'xml-js';
import { Factura } from '../Models/factura.model';
import * as JsonToXML from "js2xmlparser";
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class FacturacionManagementService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  xml: string =""
  newFactura: Factura = {
    monto:0,
    nombre:"",
    telefono:0,
    correoelectronico:"",
    identificacion:0,
    funcionid:"",
    facturaid:0,
    numerodeasiento:1,
    provincia:"",
    canton:"",
    distrito:""

  }

  fileURL: SafeResourceUrl="";
  obj = {
    "Clave": "John",
    "NumeroConsecutivo": "Smith",
    "FechaEmision": new Date(),
    "Emisor": {
      "Nombre": "CineTEC S.A",
      "Identificación": {
        "Tipo": 2,
        "Numero": "2014CD-000196-74900"
      },
      "Ubicación": {
        "Provincia": "Cartago",
        "Cantón": "Cartago",
        "Distrito": "Oriental"
      }
    },
    "Receptor": {
      "Nombre": "3212 22nd St",
      "Identificación": {
        "Tipo": 1,
        "Numero": 123
      },
      "Ubicación": {
        "Provincia": "Illinois",
        "Cantón": "San José",
        "Distrito": "Pavas"
      }
    },
    "DetalleServicio": {
      "LineaDetalle": [
        {
          "NumeroLinea": 1,
          "Código": {
            "Tipo": 1,
            "Código": 123455
          },
          "Cantidad": 1,
          "Detalle": "Entradas",
          "PrecioUnitario": 1200,
          "MontoTotal": 1200,
          "SubTotal": 1200,
          "Impuestos": {
            "Codigo": 2,
            "Tarifa": 13,
            "Monto": 400
          },
          "MontoTotalLinea": 1600
        }
      ]
    }
  };

  async getConsecutivo(){

  }

    async generateXML(sucursal:string, sala: string, proyeccion: string, pelicula: string, factura: Factura){
    this.obj.Receptor.Nombre= factura.nombre
    this.obj.Receptor.Identificación.Numero= factura.identificacion
    this.obj.Receptor.Ubicación.Provincia =factura.provincia
    this.obj.Receptor.Ubicación.Cantón =factura.canton
    this.obj.Receptor.Ubicación.Distrito =factura.distrito
    this.obj.DetalleServicio.LineaDetalle[0].Detalle="Boleto para "+pelicula+" ,sucursal "+sucursal+" ,sala "+sala+" ,tanda "+proyeccion+ " ,asiento "+ factura.numerodeasiento
    this.obj.NumeroConsecutivo="000000"+factura.facturaid as unknown as string
    this.obj.Clave="555555"+factura.facturaid as unknown as string
   
    console.log(JsonToXML.parse("FacturaElectronica", this.obj));
    return JsonToXML.parse("FacturaElectronica", this.obj)
    
  }

  async addFactura(sucursal:string, sala: string, proyeccion: string, pelicula: string, factura: Factura){
    await this.http.post(environment.api+"/factura",factura).toPromise().then(res=>{
      this.http.post(environment.api+"/factura/getFactura", factura).toPromise().then(res2=>{
        this.newFactura=factura
        this.newFactura.facturaid= (res2 as Factura[])[0].facturaid 
       
        })
      })
  
    await this.generateXML(sucursal, sala, proyeccion, pelicula, this.newFactura).then(res3=>{
      this.xml=res3
      console.log(res3)})
    return this.xml
  }


}
