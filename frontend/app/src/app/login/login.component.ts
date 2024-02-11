import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private korisnikService: KorisnikService){}

  kor_ime: string
  lozinka: string
  poruka: string

  login(){
    if(this.lozinka == null || this.kor_ime == null || this.lozinka == "" || this.kor_ime == ""){
      this.poruka = "Unesite sva polja."
      alert(this.poruka)
    }
    else{
      this.korisnikService.login(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik)=>{
        if(korisnik == null){
          this.poruka = "Ne postoji nalog za datog korisnika."
          alert(this.poruka)
        }
        else{
          if(korisnik.tip == "pacijent"){
            sessionStorage.setItem("role", "pacijent")
            sessionStorage.setItem("korisnik", JSON.stringify(korisnik))
            this.router.navigate(['pacijent'])
          }
          else if(korisnik.tip == "lekar"){
            sessionStorage.setItem("role", "lekar")
            sessionStorage.setItem("korisnik", JSON.stringify(korisnik))
            this.router.navigate(['lekar'])
          }
          else if(korisnik.tip == "menadzer"){
            this.poruka = "Menadžeri imaju posebnu formu za pristupanje sajtu."
            alert(this.poruka)
            
          }
          else{
            location.reload()
          }
        }
      })
    }
  }
}
