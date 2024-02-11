import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LekarPretragaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getLekariByIme(ime){
    const data = {
      ime: ime
    }
    return this.http.post(`${this.uri}/korisnici/getLekariByIme`, data)
  }
  getLekariByPrezime(prezime){
    const data = {
      prezime: prezime
    }
    return this.http.post(`${this.uri}/korisnici/getLekariByPrezime`, data)
  }
  getLekariBySpecijalizacija(specijalizacija){
    const data = {
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/korisnici/getLekariBySpecijalizacija`, data)
  }

  getLekariByImePrezime(ime, prezime){
    const data = {
      ime: ime,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/korisnici/getLekariByImePrezime`, data)
  }
  getLekariByPrezimeSpecijalizacija(specijalizacija, prezime){
    const data = {
      specijalizacija: specijalizacija,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/korisnici/getLekariByPrezimeSpecijalizacija`, data)
  }
  getLekariByImeSpecijalizacija(specijalizacija, ime){
    const data = {
      specijalizacija: specijalizacija,
      ime: ime
    }
    return this.http.post(`${this.uri}/korisnici/getLekariByImeSpecijalizacija`, data)
  }

  getLekariByImePrezimeSpecijalizacija(specijalizacija, ime, prezime){
    const data = {
      specijalizacija: specijalizacija,
      prezime: prezime,
      ime: ime
    }
    return this.http.post(`${this.uri}/korisnici/getLekariByImePrezimeSpecijalizacija`, data)
  }
}
