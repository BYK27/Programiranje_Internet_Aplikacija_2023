import { Component } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login-menadzer',
  templateUrl: './login-menadzer.component.html',
  styleUrls: ['./login-menadzer.component.css']
})
export class LoginMenadzerComponent {

  constructor(private korisnikService: KorisnikService, private router: Router){}

  kor_ime: string
  lozinka: string
  poruka: string

  login(){
    if(this.lozinka == null || this.kor_ime == null || this.lozinka == "" || this.kor_ime == ""){
      this.poruka = "Unesite sva polja."
      alert(this.poruka)
    }else{
      this.korisnikService.login(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik)=>{
        if(korisnik == null){
          this.poruka = "Ne postoji nalog za datog korisnika."
          alert(this.poruka)
        }
        else{
          if(korisnik.tip == "pacijent"){
            this.poruka = "Pacijenti imaju posebnu formu za pristupanje sajtu."
            alert(this.poruka)
          }
          else if(korisnik.tip == "lekar"){
            this.poruka = "Lekari imaju posebnu formu za pristupanje sajtu."
            alert(this.poruka)
          }
          else if(korisnik.tip == "menadzer"){
            
            sessionStorage.setItem("role", "menadzer")
            sessionStorage.setItem("korisnik", JSON.stringify(korisnik))
            this.router.navigate(['menadzer'])
          }
          else{
            location.reload()
          }
        }
      })
    }
    }
  }

