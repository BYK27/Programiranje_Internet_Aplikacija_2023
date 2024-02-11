import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecijalizacijaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllSpecijalizacija(){
    return this.http.get(`${this.uri}/specijalizacije/getAllSpecijalizacija`)
  }

  insertSpecijalizacija(naziv){
    const data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/specijalizacije/insertSpecijalizacija`, data)
  }

}
