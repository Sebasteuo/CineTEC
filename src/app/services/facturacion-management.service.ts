import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../Models/factura.model';
import * as JsonToXML from "js2xmlparser";
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jsPDF } from "jspdf";



@Injectable({
  providedIn: 'root'
})
export class FacturacionManagementService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  xml: string = ""
  newFactura: Factura = {
    monto: 0,
    nombre: "",
    telefono: 0,
    correoelectronico: "",
    identificacion: 0,
    funcionid: "",
    facturaid: 0,
    numerodeasiento: 1,
    provincia: "",
    canton: "",
    distrito: ""

  }

  fileURL: SafeResourceUrl = "";
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

  
 
 

  async getConsecutivo() {

  }

  async generateXML(sucursal: string, sala: string, proyeccion: string, pelicula: string, factura: Factura) {
    this.obj.Receptor.Nombre = factura.nombre
    this.obj.Receptor.Identificación.Numero = factura.identificacion
    this.obj.Receptor.Ubicación.Provincia = factura.provincia
    this.obj.Receptor.Ubicación.Cantón = factura.canton
    this.obj.Receptor.Ubicación.Distrito = factura.distrito
    this.obj.DetalleServicio.LineaDetalle[0].Detalle = "Boleto para " + pelicula + ",sucursal " + sucursal +
      ",sala " + sala + ",tanda " + proyeccion + ",asiento " + factura.numerodeasiento
    this.obj.DetalleServicio.LineaDetalle[0].PrecioUnitario = factura.monto
    this.obj.DetalleServicio.LineaDetalle[0].SubTotal = factura.monto
    this.obj.DetalleServicio.LineaDetalle[0].Impuestos.Monto = factura.monto * 0.13
    this.obj.DetalleServicio.LineaDetalle[0].MontoTotal = factura.monto * 0.13 + factura.monto
    this.obj.DetalleServicio.LineaDetalle[0].MontoTotalLinea = factura.monto * 0.13 + factura.monto
    this.obj.NumeroConsecutivo = "0000010000000000" + factura.facturaid as unknown as string
    this.obj.Clave = "22156403300003350660000" + factura.facturaid as unknown as string
    //console.log(JsonToXML.parse("FacturaElectronica", this.obj));
    return JsonToXML.parse("FacturaElectronica", this.obj)
  }

  async generatePDF(sucursal: string, sala: string, proyeccion: string, pelicula: string, factura: Factura) {
    var pdfHeader = [{
      Descripcion: "Boleto para " + pelicula + ",sucursal " + sucursal +
      ",sala " + sala + ",tanda " + proyeccion + ",asiento " + factura.numerodeasiento,
      PrecioUnit: factura.monto as unknown as string,
      Cantidad: "1",
      Impuesto: (factura.monto * 0.13) as unknown as string,
      Total: (factura.monto * 0.13 + factura.monto) as unknown as string
    }]
    
    var doc = new jsPDF({ putOnlyUsedFonts: true })
    var totalIVA = factura.monto*0.13+factura.monto
    var IVA = factura.monto*0.13
    doc.text("Factura Electrónica", 10, 20);
    doc.text("CineTEC S.A", 10, 26);
    doc.text("Cartago, Cartago, Oriental", 10, 32);
    doc.text("2014CD-000196-74900", 10, 38);
    doc.text("Clave: "+ "22156403300003350660000" + factura.facturaid as unknown as string, 10, 44);
    doc.text("Consecutivo: "+ "0000010000000000" + factura.facturaid as unknown as string, 10, 50);
    doc.text("Fecha de Emisión: "+ (new Date()).toDateString(), 10, 56);
    doc.setLineWidth(1);
    doc.line(10, 60, 190, 60);
    doc.text("Nombre: "+ factura.nombre, 10, 66);
    doc.text("Correo: "+ factura.correoelectronico, 10, 72);
    doc.text("Teléfono: "+ factura.telefono, 10, 78);
    doc.text("Direccion: "+ factura.provincia +" "+ factura.canton+ " "+factura.distrito, 10, 84);

    doc.table(30, 90, pdfHeader, ["Descripcion", "PrecioUnit", "Cantidad", "Impuesto", "Total" ], { autoSize: true });
    doc.text("SubTotal: "+ factura.monto, 130, 120);
    doc.text("Descuento: "+"0",130, 126);
    doc.text("Impuesto: "+ IVA, 130, 132);
    doc.text("TotalGrav: "+ totalIVA, 130, 138);
    doc.text("TotalEx: "+"0", 130, 144);
    doc.text("Total: "+totalIVA, 130, 150);

  

    return doc
  }

  async addFactura(sucursal: string, sala: string, proyeccion: string, pelicula: string, factura: Factura) {
    await this.http.post(environment.api + "/factura", factura).toPromise().then(res => {
      this.http.post(environment.api + "/factura/getFactura", factura).toPromise().then(res2 => {
        this.newFactura = factura
        this.newFactura.facturaid = (res2 as Factura[])[0].facturaid
      })
    })
    return this.newFactura
  }


}

