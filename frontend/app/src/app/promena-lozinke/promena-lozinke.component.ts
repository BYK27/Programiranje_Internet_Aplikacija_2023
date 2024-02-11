import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private router: Router, private korisnikService: KorisnikService, private userIdle: UserIdleService){
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {});
    this.userIdle.onTimeout().subscribe(() => {
      userIdle.stopWatching()
      alert("Vaša sesija je istekla.")
      sessionStorage.clear()
      router.navigate(['login_menadzer'])
    });
  }
  
  lozinkaStara: string
  lozinka1: string
  lozinka2: string
  
  promeni(){

    if(this.lozinkaStara == null || this.lozinka1 == null || this.lozinka2 == null ||
      this.lozinkaStara == "" || this.lozinka1 == "" || this.lozinka2 == "") {
      alert("Morate uneti sva polja.")
      return
    }

    let korisnik: Korisnik = JSON.parse(sessionStorage.getItem('korisnik'))

    if(korisnik.lozinka != this.lozinkaStara) {
      alert("Morate uneti tačnu staru lozinku.")
      return
    }

    if(this.lozinka1 != this.lozinka2){
      alert("Morate uneti tačnu potvrdu nove lozinke.")
      return
    }

    let regex1 = /^[a-zA-Z](?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,14}$/
    let regex2 = /(.)\1\1/
    if(!regex1.test(this.lozinka1))
    {
      alert("Lozinka mora početi slovom, imati od 8 do 14 karaktera, barem jedno veliko slovo, broj i specijalni karakter.")
      return
    }
    if(regex2.test(this.lozinka1)){
      alert("Lozinka ne sme imati dva slova koja se ponavljaju.")
      return
    }
    
    this.korisnikService.updateLozinkaByKorIme(korisnik.kor_ime, this.lozinka1).subscribe(resp=>{
      sessionStorage.clear()

      if(korisnik.tip == 'menadzer'){
        this.router.navigate(['login_menadzer'])
      }
      else this.router.navigate(['login']);
    })
  }

  nazad(){
    let korisnik: Korisnik = JSON.parse(sessionStorage.getItem('korisnik'))
    if(korisnik.tip == 'menadzer'){
      this.router.navigate(['menadzer'])
    }
    else if(korisnik.tip == 'pacijent'){
      this.router.navigate(['pacijent'])
    }
    else if(korisnik.tip == 'lekar'){
      this.router.navigate(['lekar'])
    }
  }
}
