import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getBazniPregledByLekar(lekar){
    const data = {
      lekar: lekar
    }
    return this.http.post(`${this.uri}/pregledi/getBazniPregledByLekar`, data)
  }

  getAllBazniPregled(){
    return this.http.get(`${this.uri}/pregledi/getAllBazniPregled`)
  }

  getAllPendingPregled(){
    return this.http.get(`${this.uri}/pregledi/getAllPendingPregled`)
  }

  getZakazaniPregledByLekar(lekar){
    const data = {
      lekar: lekar
    }
    return this.http.post(`${this.uri}/pregledi/getZakazaniPregledByLekar`, data)
  }

  getPregledByPacijent(pacijent){
    const data = {
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/pregledi/getPregledByPacijent`, data)
  }

  getBazniPregledByNaziv(naziv){
    const data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/pregledi/getBazniPregledByNaziv`, data)
  }

  getBazniPregledBySpecijalizacija(specijalizacija){
    const data = {
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/pregledi/getBazniPregledBySpecijalizacija`, data)
  }

  insertPregled(lekar, naziv, trajanje, pocetak, cena, status, datum, pacijent, ordinacija, specijalizacija, izvestaj){
    const data = {
      lekar: lekar,
      naziv: naziv,
      trajanje: trajanje,
      pocetak: pocetak,
      cena: cena,
      status: status,
      datum: datum,
      pacijent: pacijent,
      ordinacija: ordinacija,
      specijalizacija: specijalizacija,
      izvestaj: izvestaj
    }
    return this.http.post(`${this.uri}/pregledi/insertPregled`, data)
  }

  insertPendingOrBazniPregled(lekar, naziv, trajanje, cena, status,  specijalizacija, izvestaj){
    const data = {
      lekar: lekar,
      naziv: naziv,
      trajanje: trajanje,
      cena: cena,
      status: status,
      specijalizacija: specijalizacija,
      izvestaj: izvestaj
    }
    return this.http.post(`${this.uri}/pregledi/insertPendingOrBazniPregled`, data)
  }

  updateNazivByNaziv(naziv, novi_naziv){
    const data = {
      naziv: naziv,
      novi_naziv: novi_naziv
    }
    return this.http.post(`${this.uri}/pregledi/updateNazivByNaziv`, data)
  }
  updateTrajanjevByNaziv(naziv, sat, minut){
    const data = {
      naziv: naziv,
      sat: sat,
      minut: minut
    }
    return this.http.post(`${this.uri}/pregledi/updateTrajanjevByNaziv`, data)
  }
  updateSpecijalizacijaByNaziv(naziv, specijalizacija){
    const data = {
      naziv: naziv,
      minspecijalizacijaut: specijalizacija
    }
    return this.http.post(`${this.uri}/pregledi/updateSpecijalizacijaByNaziv`, data)
  }
  updateCenaByNaziv(naziv, cena){
    const data = {
      naziv: naziv,
      cena: cena
    }
    return this.http.post(`${this.uri}/pregledi/updateCenaByNaziv`, data)
  }
  updateStatusByNaziv(naziv, status){
    const data = {
      naziv: naziv,
      status: status
    }
    return this.http.post(`${this.uri}/pregledi/updateStatusByNaziv`, data)
  }

  deletePregled(naziv){
    const data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/pregledi/deletePregled`, data)
  }

  updateBazniLekarByNaziv(naziv, lekar){
    const data = {
      naziv: naziv,
      lekar: lekar
    }
    return this.http.post(`${this.uri}/pregledi/updateBazniLekarByNaziv`, data)
  }
  
  otkaziPregled(naziv, lekar, sat, minut, datum, komentar){
    const data = {
      naziv: naziv,
      lekar: lekar,
      sat: sat,
      minut: minut,
      datum: datum,
      komentar: komentar
    }
    return this.http.post(`${this.uri}/pregledi/otkaziPregled`, data)
  }

  getZakazanPregledNoIzvestaj(){
    return this.http.get(`${this.uri}/pregledi/getZakazanPregledNoIzvestaj`)
  }

  getZakazanPregledNoIzvestajByNazivLekarPocetakDatum(naziv, lekar, pocetak, datum){
    const data = {
      naziv: naziv,
      lekar: lekar,
      pocetak: pocetak,
      datum: datum
    }
    return this.http.post(`${this.uri}/pregledi/getZakazanPregledNoIzvestajByNazivLekarPocetakDatum`, data)
  }

  updateZakazanByNazivLekarPocetakDatum(naziv, lekar, pocetak, datum){
    const data = {
      naziv: naziv,
      lekar: lekar,
      pocetak: pocetak,
      datum: datum
    }
    return this.http.post(`${this.uri}/pregledi/updateZakazanByNazivLekarPocetakDatum`, data)
  }

  updateObavestenByNazivLekarPocetakDatum(naziv, lekar, pocetak, datum){
    const data = {
      naziv: naziv,
      lekar: lekar,
      pocetak: pocetak,
      datum: datum
    }
    return this.http.post(`${this.uri}/pregledi/updateObavestenByNazivLekarPocetakDatum`, data)
  }
}
