import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(kor_ime, lozinka){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/korisnici/login`, data)
  }

  register(kor_ime, lozinka, ime, prezime, adresa, telefon, mejl, slika){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon,
      mejl: mejl,
      slika: slika
    }
    return this.http.post(`${this.uri}/korisnici/register`, data)
  }

  registerLekar(kor_ime, lozinka, ime, prezime, adresa, telefon, mejl, licenca, specijalizacija, ordinacija ,slika){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon,
      mejl: mejl,
      licenca: licenca,
      specijalizacija: specijalizacija,
      ordinacija: ordinacija,
      slika: slika
    }
    return this.http.post(`${this.uri}/korisnici/registerLekar`, data)
  }

  getKorisnikByKorMail(mejl){
    const data = {
      mejl: mejl
    }
    return this.http.post(`${this.uri}/korisnici/getKorisnikByKorMail`, data)
  }

  getKorisnikByKorIme(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/getKorisnikByKorIme`, data)
  }

  getAllLekari(){
    return this.http.get(`${this.uri}/korisnici/getAllLekari`)
  }

  getAllPacijenti(){
    return this.http.get(`${this.uri}/korisnici/getAllPacijenti`)
  }

  getKorisnikByNeregistrovan(){
    return this.http.get(`${this.uri}/korisnici/getKorisnikByNeregistrovan`)
  }

  updateLozinkaByKorIme(kor_ime, lozinka){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/korisnici/updateLozinkaByKorIme`, data)
  }

  updateGodisnjiByKorIme(kor_ime, godisnji_pocetak, godisnji_kraj){
    const data = {
      kor_ime: kor_ime,
      godisnji_pocetak: godisnji_pocetak,
      godisnji_kraj: godisnji_kraj
    }
    return this.http.post(`${this.uri}/korisnici/updateGodisnjiByKorIme`, data)
  }
  
  insertSlobodanDanByKorIme(kor_ime, slobodan_dan){
    const data = {
      kor_ime: kor_ime,
      slobodan_dan: slobodan_dan
    }
    return this.http.post(`${this.uri}/korisnici/insertSlobodanDanByKorIme`, data)
  }
}
