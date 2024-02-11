import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getObavestenjaByPacijent(pacijent){
    const data = {
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/obavestenja/getObavestenjaByPacijent`, data)
  }

  getAllObavestenja(){
    return this.http.get(`${this.uri}/obavestenja/getAllObavestenja`)
  }

  updateObavestenjeStatusById(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/obavestenja/updateObavestenjeStatusById`, data)
  }

  obavestiSvePacijente(naziv, pacijent, id){
    const data = {
      naziv: naziv,
      pacijent: pacijent,
      id: id
    }
    return this.http.post(`${this.uri}/obavestenja/obavestiSvePacijente`, data)
  }
}
