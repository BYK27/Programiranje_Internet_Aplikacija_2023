import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  updateImeByKorIme(kor_ime, ime){
    const data = {
      kor_ime: kor_ime,
      ime: ime
    }
    return this.http.post(`${this.uri}/korisnici/updateImeByKorIme`, data)
  }

  updatePrezimeByKorIme(kor_ime, prezime){
    const data = {
      kor_ime: kor_ime,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/korisnici/updatePrezimeByKorIme`, data)
  }

  updateAdresuByKorIme(kor_ime, adresa){
    const data = {
      kor_ime: kor_ime,
      adresa: adresa
    }
    return this.http.post(`${this.uri}/korisnici/updateAdresuByKorIme`, data)
  }

  updateTelefonByKorIme(kor_ime, telefon){
    const data = {
      kor_ime: kor_ime,
      telefon: telefon
    }
    return this.http.post(`${this.uri}/korisnici/updateTelefonByKorIme`, data)
  }



  updateSlikaByKorIme(kor_ime, slika){
    const data = {
      kor_ime: kor_ime,
      slika: slika
    }
    return this.http.post(`${this.uri}/korisnici/updateSlikaByKorIme`, data)
  }

  updateLicencaByKorIme(kor_ime, licenca){
    const data = {
      kor_ime: kor_ime,
      licenca: licenca
    }
    return this.http.post(`${this.uri}/korisnici/updateLicencaByKorIme`, data)
  }

  updateSpecijalizacijaByKorIme(kor_ime, specijalizacija){
    const data = {
      kor_ime: kor_ime,
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/korisnici/updateSpecijalizacijaByKorIme`, data)
  }

  updateOrdinacijaByKorIme(kor_ime, ordinacija){
    const data = {
      kor_ime: kor_ime,
      ordinacija: ordinacija
    }
    return this.http.post(`${this.uri}/korisnici/updateOrdinacijaByKorIme`, data)
  }

  updateStatusByKorIme(kor_ime, status){
    const data = {
      kor_ime: kor_ime,
      status: status
    }
    return this.http.post(`${this.uri}/korisnici/updateStatusByKorIme`, data)
  }

  deleteByKorIme(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/deleteByKorIme`, data)
  }
}
