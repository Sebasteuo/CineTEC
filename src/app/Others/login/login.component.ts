import { Component, OnInit } from '@angular/core';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import { Credenciales } from 'src/app/Models/credenciales.Model';
import { AuthenticationManagementService } from 'src/app/services/authentication-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newCredenciales: Credenciales={ user:"", password:"", tipo:"", cedula:0}

  constructor(private authenticationService: AuthenticationManagementService) { }

  ngOnInit(): void {
  }
  submit(){
   var pass = (CryptoJS.MD5(this.newCredenciales.password as unknown as string) as unknown) as string;
   this.newCredenciales.password=CryptoJS.enc.Base64.stringify(sha256(pass))
  this.authenticationService.login(this.newCredenciales); 
    //this.authenticationService.login(this.newCredenciales);
  }
 
}
