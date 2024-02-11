import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { LekarPretragaService } from '../services/lekar-pretraga.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit, OnInit{

  @ViewChild('carousel') carousel!: MdbCarouselComponent;

  constructor(private router: Router, private korisnikService: KorisnikService, private lekarPretragaService: LekarPretragaService) {
    this.imeS = false
    this.prezimeS = false
    this.specijalizacijaS = false
  }

  sviLekari: Korisnik[]
  imeS: boolean
  prezimeS: boolean
  specijalizacijaS: boolean

  imePretraga: string
  prezimePretraga: string
  specijalizacijaPretraga: string
  rezultatiPretraga: Korisnik[]
  pretrazio: boolean

  ngAfterViewInit(): void {
    this.carousel.stop();
  }

  ngOnInit(): void {
    this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
      this.sviLekari = lekari
    })
  }

  test(){
    console.log("hello")
  }

  sortIme(){

    if(this.imeS){
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return l1.ime.localeCompare(l2.ime)
      })
    }
    else{
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return l2.ime.localeCompare(l1.ime)
      })
    }
    this.imeS = !this.imeS
  }

  sortPrezime(){

    if(this.prezimeS){
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return l1.prezime.localeCompare(l2.prezime)
      })
    }
    else{
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return l2.prezime.localeCompare(l1.prezime)
      })
    }
    this.prezimeS = !this.prezimeS
  }

  sortSpecijalizacija(){
    if(this.specijalizacijaS){
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return l1.specijalizacija.localeCompare(l2.specijalizacija)
      })
    }
    else{
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return l2.specijalizacija.localeCompare(l1.specijalizacija)
      })
    }
    this.specijalizacijaS = !this.specijalizacijaS
  }

  pretrazi(){
    if(this.prezimePretraga == null) this.prezimePretraga = ""
    if(this.imePretraga == null) this.imePretraga = ""
    if(this.specijalizacijaPretraga == null) this.specijalizacijaPretraga = ""
    this.rezultatiPretraga = this.sviLekari.filter(lekar => lekar.ime.includes(this.imePretraga) && lekar.prezime.includes(this.prezimePretraga) && lekar.specijalizacija.includes(this.specijalizacijaPretraga))
  }

  pretraziStaro(){
    if(this.imePretraga == "") this.imePretraga = null
    if(this.prezimePretraga == "") this.prezimePretraga = null
    if(this.specijalizacijaPretraga == "") this.specijalizacijaPretraga = null
    this.rezultatiPretraga = null
    if(this.imePretraga == null && this.prezimePretraga == null && this.specijalizacijaPretraga == null){
      this.rezultatiPretraga = this.sviLekari;
      return
    }
    if(this.imePretraga != null && this.prezimePretraga != null && this.specijalizacijaPretraga != null){
      this.lekarPretragaService.getLekariByImePrezimeSpecijalizacija(this.specijalizacijaPretraga, this.imePretraga, this.prezimePretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }

    if(this.imePretraga != null && this.prezimePretraga == null && this.specijalizacijaPretraga == null){
      this.lekarPretragaService.getLekariByIme(this.imePretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }
    if(this.imePretraga == null && this.prezimePretraga != null && this.specijalizacijaPretraga == null){
      this.lekarPretragaService.getLekariByPrezime(this.prezimePretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }
    //TODO: method not working ? enters method but gets all results
    if(this.imePretraga == null && this.prezimePretraga == null && this.specijalizacijaPretraga != null){
      this.lekarPretragaService.getLekariBySpecijalizacija(this.specijalizacijaPretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }

    if(this.imePretraga != null && this.prezimePretraga != null && this.specijalizacijaPretraga == null){
      this.lekarPretragaService.getLekariByImePrezime(this.imePretraga, this.prezimePretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }
    if(this.imePretraga != null && this.prezimePretraga == null && this.specijalizacijaPretraga != null){
      this.lekarPretragaService.getLekariByImeSpecijalizacija(this.specijalizacijaPretraga, this.imePretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }
    if(this.imePretraga == null && this.prezimePretraga != null && this.specijalizacijaPretraga != null){
      this.lekarPretragaService.getLekariByPrezimeSpecijalizacija(this.specijalizacijaPretraga, this.prezimePretraga).subscribe((data: Korisnik[])=>{
        this.rezultatiPretraga = data
        return
      })
    }
  }
}
