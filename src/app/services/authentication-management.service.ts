import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/client.Model';
import { Credenciales } from '../Models/credenciales.Model';
import { Empleado } from '../Models/empleado.Model';
import { RolXEmpleado } from '../Models/rol-xempleado.Model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationManagementService {

  newUser: Credenciales = { user: "", password: "", tipo: "", cedula: 0 }
  newCliente:Client ={
    nombrecliente1:"",
    nombrecliente2:"",
    apellidocliente1:"",
    apellidocliente2:"",
    cedulaempleado:0,
    fechanacimiento: new Date(),
    numerotelefono:0,
    cedulacliente:0,
    usuario:"",
    contrasenna:""
   
    
  }

  constructor(private router: Router, public toastr: ToastrService, public http: HttpClient) { }
  Users: Credenciales[] = []



  //Hace una consulta en el API para verificar credenciales del usuario y guardar los datos del usuario como cookies
  async login(Credenciales: Credenciales) {
    const body = {
      user: Credenciales.user,
      password: Credenciales.password
    }

    await this.http.post(environment.api + "/empleado/checkCredentials", body).toPromise().then(res => {
      if ((res as Empleado[]).length > 0) {
        localStorage.setItem("User", Credenciales.user as unknown as string)
        localStorage.setItem("UserId", (res as Empleado[])[0].cedulaempleado as unknown as string)
        this.http.get(environment.api + "/RolXEmpleado/" + (res as Empleado[])[0].cedulaempleado).toPromise().then(res2 => {
          localStorage.setItem("UserType", (res2 as RolXEmpleado[])[0].nombre as unknown as string)
          this.router.navigate(["/Welcome"])
        })
      }
      else {
        this.http.post(environment.api + "/cliente/checkCredentials", body).toPromise().then(res => {
          if ((res as Client[]).length > 0) {
            localStorage.setItem("User", Credenciales.user as unknown as string)
            localStorage.setItem("UserId", (res as Client[])[0].cedulacliente as unknown as string)
            localStorage.setItem("UserType", "Cliente")
            this.router.navigate(["/Compra"])
          }
          else{
            this.toastr.error("Credenciales incorrectas", "Error")
          }
        })
      }
    })
  }
  async getClientID(user: Credenciales) {

    var id = ""
    await this.http.post(environment.api + "/usuario/getCedula", user, { responseType: "text" }).toPromise().then(res => {
      id = res

    })

    return id
  }
  logout() {
    localStorage.removeItem("User")
    localStorage.removeItem("UserType")
    localStorage.removeItem("UserId")
    this.router.navigate(["/Welcome"])
  }


  //Envía los datos al API para registrar un cliente 
  async Register(id: number, tipo: string, user: string, password: string) {
    if (tipo && user && password && id) {
      this.newCliente.usuario = user
      this.newCliente.contrasenna = password
      this.newCliente.cedulacliente = id
      await this.http.put(environment.api + "/cliente/UpdateCredenciales", this.newCliente).toPromise().then(res => {
        this.toastr.success("Registrado exitosamente", "Exito")
        this.router.navigate(["/Login"])
      }, error => {
        this.toastr.error("No se pudo registrar", "Error")
      })
    }


    else {
      this.toastr.error("Debe llenar todos los campos", "Error")
    }
  }
}

