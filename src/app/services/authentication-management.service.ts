import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Credenciales } from '../Models/credenciales.Model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationManagementService {

  newUser: Credenciales = { user: "", password: "", tipo: "", cedula: 0 }

  constructor(private router: Router, public toastr: ToastrService, public http: HttpClient) { }
  Users: Credenciales[] = []



  //Hace una consulta en el API para verificar credenciales del usuario y guardar los datos del usuario como cookies
  async login(Credenciales: Credenciales) {


    await this.http.post(environment.api + "/usuario", Credenciales, { responseType: "text" }).toPromise().then(res => {
      localStorage.setItem("User", Credenciales.user as unknown as string)
      localStorage.setItem("UserType", res as string)
      this.getClientID(Credenciales).then(res => { localStorage.setItem("UserId", res) })
      this.router.navigate(["/Welcome"])
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
      this.newUser.user = user
      this.newUser.password = password
      this.newUser.tipo = tipo
      this.newUser.cedula = id
      await this.http.post(environment.api + "/usuario/Registrar", this.newUser).toPromise().then(res => {
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
