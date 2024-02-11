import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{

  constructor(private router: Router){}

  logout(){
    this.router.navigate([''])
  }

  login(){
    sessionStorage.clear()
    this.router.navigate(['login'])
  }

}
