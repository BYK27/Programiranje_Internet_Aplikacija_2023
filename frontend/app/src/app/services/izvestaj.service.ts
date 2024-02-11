import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getIzvestajByPacijent(pacijent){
    const data = {
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/izvestaji/getIzvestajByPacijent`, data)
  }

  insertIzvestaj(datum, vreme, lekar, specijalizacija, razlog, dijagnoza, terapija, naredni, pacijent, pregled){
    const data = {
      datum: datum,
      vreme: vreme,
      lekar: lekar,
      specijalizacija: specijalizacija,
      razlog: razlog,
      dijagnoza: dijagnoza,
      terapija: terapija,
      naredni: naredni,
      pacijent: pacijent,
      pregled: pregled
    }
    return this.http.post(`${this.uri}/izvestaji/insertIzvestaj`, data)
  }

  getIzvestajByDatumVremeLekarPacijent(datum, sat, minut, lekar, pacijent){
    const data = {
      datum: datum,
      sat: sat,
      minut: minut,
      lekar: lekar,
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/izvestaji/getIzvestajByDatumVremeLekarPacijent`, data)
  }
}
