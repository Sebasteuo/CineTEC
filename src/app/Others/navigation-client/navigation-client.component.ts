import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-client',
  templateUrl: './navigation-client.component.html',
  styleUrls: ['./navigation-client.component.scss']
})
export class NavigationClientComponent implements OnInit {

  constructor(private router:Router) { }
  public isCollapsed = true; //Controla la apariencia de la barra de navegación
  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem("User")
    localStorage.removeItem("UserType")
    this.router.navigate(["/Login"])
  } 

 
}
