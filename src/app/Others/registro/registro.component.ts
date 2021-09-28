import { Component, OnInit } from '@angular/core';
import sha256 from 'crypto-js/sha256';
import { AuthenticationManagementService } from 'src/app/services/authentication-management.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private authenticationService: AuthenticationManagementService) { }

  ngOnInit(): void {
  }
  onSubmit(user:string, password:string, id:string){
    var pass = (CryptoJS.MD5(password) as unknown) as string;
    this.authenticationService.Register(id as unknown as number,"Cliente",user, CryptoJS.enc.Base64.stringify(sha256(pass))); 


  }

}
