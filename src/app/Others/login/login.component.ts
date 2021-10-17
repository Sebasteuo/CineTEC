import { Component, OnInit } from '@angular/core';
import { Credenciales } from 'src/app/Models/credenciales.Model';
import { AuthenticationManagementService } from 'src/app/services/authentication-management.service';
import * as Crypto from "crypto-js"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = ""
  newCredenciales: Credenciales = { user: "", password: "", tipo: "", cedula: 0 }

  constructor(private authenticationService: AuthenticationManagementService) { }

  ngOnInit(): void {
  }

  submit() {
    var pass = (CryptoJS.MD5(this.password as unknown as string) as unknown) as string;
    this.newCredenciales.password = CryptoJS.enc.Base64.stringify(Crypto.SHA256(pass))
    this.authenticationService.login(this.newCredenciales);
  }

}

