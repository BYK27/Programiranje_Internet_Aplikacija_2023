import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UserIdleService } from 'angular-user-idle';
import { UpdateService } from '../services/update.service';
import { KorisnikService } from '../services/korisnik.service';
import { FileUploader } from 'ng2-file-upload';
import { Specijalizacija } from '../models/specijalizacija';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { IzvestajService } from '../services/izvestaj.service';
import { Izvestaj } from '../models/izvestaj';
import { ObavestenjeService } from '../services/obavestenje.service';
import { Obavestenje } from '../models/obavestenje';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
const URL = 'http://localhost:4000/api/upload';
@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit{

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  constructor(private router: Router, private userIdle: UserIdleService, private updateService: UpdateService, private korisnikService: KorisnikService, private specijalizacijaService: SpecijalizacijaService, private pregledService: PregledService, private izvestajService: IzvestajService, private obavestenjeService: ObavestenjeService){
    this.rezim = "profil"
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {});
    this.userIdle.onTimeout().subscribe(() => {
      userIdle.stopWatching()
      alert("Vaša sesija je istekla.")
      sessionStorage.clear()
      router.navigate(['login'])
    });
  }
  ngOnInit(): void {
    let role = sessionStorage.getItem("role")
    if(role != "lekar") this.router.navigate([''])
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"))
    this.triZakazanaPregledaLekara = []
    this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((blueprint: Korisnik)=>{
      if(blueprint.tip != 'lekar') this.router.navigate([''])
      this.specijalizacijaService.getAllSpecijalizacija().subscribe((spec: Specijalizacija[])=>{
        this.sveSpecijalizacije = spec
        this.pregledService.getBazniPregledBySpecijalizacija(this.korisnik.specijalizacija).subscribe((bazni: Pregled[])=>{
          this.sviBazniPregledi = bazni
          this.pregledService.getZakazaniPregledByLekar(this.korisnik.kor_ime).subscribe((zak: Pregled[])=>{
            this.zakazaniPreglediLekara = zak
            this.zakazaniPreglediLekara = this.zakazaniPreglediLekara.sort((i1, i2)=>{
              return i1.pocetak[1] - i2.pocetak[1]
            })
            this.zakazaniPreglediLekara = this.zakazaniPreglediLekara.sort((i1, i2)=>{
              return i1.pocetak[0] - i2.pocetak[0]
            })
            this.zakazaniPreglediLekara = this.zakazaniPreglediLekara.sort((i1, i2)=>{
              return new Date(i1.datum).getTime() - new Date(i2.datum).getTime()
            })



            let iterator = 0;
            let manjak = 0;
            let end = false
            let now2 = new Date();
            let year2 = now2.getFullYear();
            let month2 = now2.getMonth() + 1;
            let day2 = now2.getDate();
            let now_str2 = year2 + "-" + month2 + "-" + day2

            while(iterator < this.zakazaniPreglediLekara.length && !end && manjak < 3){
              //pregled is in the past
              if(this.uporediDvaDatuma(this.zakazaniPreglediLekara.at(iterator).datum, now_str2)){
                
              }
              else{
                this.triZakazanaPregledaLekara.push(this.zakazaniPreglediLekara.at(iterator));
                manjak = manjak + 1
                if(manjak == 3) end = true
              }
              ++iterator
            }

            let temp: any = []
            for(let i = 0 ; i < zak.length ; ++i){
              
              let novi_datum = new Date(this.zakazaniPreglediLekara.at(i).datum)
              let novi_datum_string = ""
              if((novi_datum.getMonth()+1) < 10){
                if(novi_datum.getDate() < 10) novi_datum_string = novi_datum.getFullYear() + "-" +"0"+ (novi_datum.getMonth() + 1) + "-0" + novi_datum.getDate()
                else novi_datum_string = novi_datum.getFullYear() + "-" +"0"+ (novi_datum.getMonth() + 1) + "-" + novi_datum.getDate()
              }
              else {
                if(novi_datum.getDate() < 10) novi_datum_string = novi_datum.getFullYear() + "-" + (novi_datum.getMonth() + 1) + "-0" + novi_datum.getDate()
                else novi_datum_string = novi_datum.getFullYear() + "-" + (novi_datum.getMonth() + 1) + "-" + novi_datum.getDate()
              }
              let eventDate = novi_datum_string

               //get hours and minuts
               let h = this.zakazaniPreglediLekara.at(i).pocetak[0] + this.zakazaniPreglediLekara.at(i).trajanje[0]
               let m = 0;
               if(this.zakazaniPreglediLekara.at(i).pocetak[1] + this.zakazaniPreglediLekara.at(i).trajanje[1] >= 60){
                 h += 1
                 m = this.zakazaniPreglediLekara.at(i).pocetak[1] + this.zakazaniPreglediLekara.at(i).trajanje[1] - 60
               }
               else{
                 m = this.zakazaniPreglediLekara.at(i).pocetak[1] + this.zakazaniPreglediLekara.at(i).trajanje[1]
               }

               let dateTimeString = ""
              if(this.zakazaniPreglediLekara.at(i).pocetak[1] < 10) dateTimeString = eventDate + "T" + this.zakazaniPreglediLekara.at(i).pocetak[0] + ":0" + this.zakazaniPreglediLekara.at(i).pocetak[1]
              else dateTimeString = eventDate + "T" + this.zakazaniPreglediLekara.at(i).pocetak[0] + ":" + this.zakazaniPreglediLekara.at(i).pocetak[1]
              let endTimeString = ""
              if(m < 10 ) endTimeString = eventDate + "T" + h + ":0" + m;
              else endTimeString = eventDate + "T" + h + ":" + m;
              
              let newEvent = {
                title: this.zakazaniPreglediLekara.at(i).naziv ,
                start: dateTimeString,
                end:  endTimeString
              };
              temp.push(newEvent)
              this.calendarEvents.push(newEvent);
            }
            this.calendarEvents = temp
            this.pregledService.getZakazanPregledNoIzvestaj().subscribe((bezIzv: Pregled[])=>{
              let now = new Date();
              let year = now.getFullYear();
              let month = now.getMonth() + 1;
              let day = now.getDate();
              let hour = now.getHours();
              let minute = now.getMinutes();
              let now_str = year + "-" + month + "-" + day
              //find pregledi bez izvestaja in the past 
              this.preglediBezIzvestaja = []
              for(let i = 0 ; i < bezIzv.length ; ++i){
                let pregled_datum = new Date(bezIzv.at(i).datum)
                let year_pregled = pregled_datum.getFullYear();
                let month_pregled = pregled_datum.getMonth() + 1;
                let day_pregled = pregled_datum.getDate();
                let hour_pregled = pregled_datum.getHours();
                let minute_pregled = pregled_datum.getMinutes();
                if(year_pregled < year) this.preglediBezIzvestaja.push(bezIzv.at(i))
                else if(year_pregled == year){
                  if(month_pregled < month) this.preglediBezIzvestaja.push(bezIzv.at(i))
                  else if(month_pregled == month){
                    if(day_pregled < day) this.preglediBezIzvestaja.push(bezIzv.at(i))
                    else if(day_pregled == day){
                      if(hour_pregled < hour) this.preglediBezIzvestaja.push(bezIzv.at(i))
                      else if(hour_pregled == hour){
                        if(minute_pregled < minute) this.preglediBezIzvestaja.push(bezIzv.at(i))
                      }
                    }
                  }
                }
              }
              
            })
          })
        })
      })
    })

    
  }

  korisnik: Korisnik
  rezim: string
  sveSpecijalizacije: Specijalizacija[]

  novoIme: string
  novoPrezime: string
  novaAdresa: string
  noviMejl: string
  noviTelefon: string
  novaLicenca: string
  novaSpecijalizacija: string
  novaOrdinacija: string
  novaSlika: string

  sviBazniPregledi: Pregled[]
  zakazaniPreglediLekara: Pregled[]
  triZakazanaPregledaLekara: Pregled[] = []

  noviPregledNaziv: string
  noviPregledTrajanjeSat: number
  noviPregledTrajanjeMinut: number
  noviPregledCena: number

  izvestajiPacijenta: Izvestaj[]

  godisnji_pocetak: string;
  godisnji_kraj: string;
  slobodan_dan: string;

  preglediBezIzvestaja: Pregled[] = []
  pregledZaIzvestaj: Pregled
  izvestajRazlog: string
  izvestajDijagnoza: string
  izvestajTerapija: string
  izvestajNaredni: string

  

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    validRange: {
      start: new Date(), // Start date is today
      end: new Date().setDate(new Date().getDate() + 14) // End date is 14 days (2 weeks) from today
    },
    slotMinTime: '08:00:00',     // Set the minimum time to 8:00 AM
    slotDuration: '01:00:00',

    //events: []

    events: [
      { title: 'event 1', start: '2023-08-23T14:50', end: '2023-08-23T18:50' },
      { title: 'event 2',  start: '2023-08-24T10:20', end: '2023-08-24T15:20'}
    ]
  };
  
  calendarEvents = [
    { title: 'event 1', start: '2023-08-23T14:50', end: '2023-08-23T18:50' },
    { title: 'event 2', start: '2023-08-24T10:20', end: '2023-08-24T15:20' }
  ];

  azurirajIme(){
    if(this.novoIme == null || this.novoIme == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateImeByKorIme(this.korisnik.kor_ime, this.novoIme).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novoIme = null
      })
    })
  }

  azurirajPrezime(){
    if(this.novoPrezime == null || this.novoPrezime == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updatePrezimeByKorIme(this.korisnik.kor_ime, this.novoPrezime).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novoPrezime = null
      })
    })
  }

  azurirajAdresu(){
    if(this.novaAdresa == null || this.novaAdresa == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateAdresuByKorIme(this.korisnik.kor_ime, this.novaAdresa).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novaAdresa = null
      })
    })
  }

  azurirajTelefon(){
    if(this.noviTelefon == null || this.noviTelefon == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateTelefonByKorIme(this.korisnik.kor_ime, this.noviTelefon).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.noviTelefon = null
      })
    })
  }

  azurirajLicencu(){
    
    if(this.novaLicenca == null || this.novaLicenca == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateLicencaByKorIme(this.korisnik.kor_ime, this.novaLicenca).subscribe((resp)=>{
      
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novaLicenca = null
      })
    })
  }

  azurirajSpecijalizaciju(){
    if(this.novaSpecijalizacija == null || this.novaSpecijalizacija == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateSpecijalizacijaByKorIme(this.korisnik.kor_ime, this.novaSpecijalizacija).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.pregledService.getBazniPregledBySpecijalizacija(this.korisnik.specijalizacija).subscribe((bazni: Pregled[])=>{
          this.sviBazniPregledi = bazni
          this.novaSpecijalizacija = null;
        })
      })
    })
  }

  azurirajSliku(){
    if(this.novaSlika == null) {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.novaSlika = this.novaSlika.substring(12, this.novaSlika.length)
    this.updateService.updateSlikaByKorIme(this.korisnik.kor_ime, this.novaSlika).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novaSlika = null
      })
    })
  }

  azurirajOrdinaciju(){
    alert("Svaka čast B)")
  }


  rezimProfil(){this.rezim = "profil"}
  rezimPregledi(){this.rezim = "pregledi"}
  rezimRazno(){this.rezim = "razno"}

  test(){
    alert("ej")
  }

  updateBazniLekarByNaziv(naziv: string){
    this.pregledService.updateBazniLekarByNaziv(naziv, this.korisnik.kor_ime).subscribe(resp=>{
      this.pregledService.getBazniPregledBySpecijalizacija(this.korisnik.specijalizacija).subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
      })
      
    })
  }

  otkaziPregled(naziv: string, lekar: string, sat: number, minut: number, datum: string, komentar: string, pacijent: string){
    if(komentar == null || komentar == ""){
      alert("Morate priložiti komentar pri otkazivanju pregleda.")
      return
    }
    this.pregledService.otkaziPregled(naziv, lekar, sat, minut, datum, komentar).subscribe(resp=>{
      this.pregledService.getZakazaniPregledByLekar(this.korisnik.kor_ime).subscribe((zak: Pregled[])=>{
        this.zakazaniPreglediLekara = zak
        this.triZakazanaPregledaLekara = []
        for(let i = 0 ; i < zak.length ; ++i){
          this.triZakazanaPregledaLekara.push(zak[i])
        }

        let error = "Vaš pregled " + naziv + " je otkazan."

        this.obavestenjeService.getAllObavestenja().subscribe((obavestenja: Obavestenje[])=>{
          let maxid = 0
          for(let i = 0 ; i < obavestenja.length ; ++i){
            if(obavestenja.at(i).id > maxid) maxid = obavestenja.at(i).id
          }
          this.obavestenjeService.obavestiSvePacijente(error, pacijent, maxid + 1).subscribe(resp=>{
            alert("Pregled uspešno otkazan.")
            this.ngOnInit()
          })
        })
        

      })
    })
  }

  prikaziIzvestajPacijenta(pacijent: string){
    this.izvestajService.getIzvestajByPacijent(pacijent).subscribe((izv: Izvestaj[])=>{
      this.izvestajiPacijenta = izv
    })
  }

  dodajNoviPregled(){
    if(this.noviPregledNaziv == null || this.noviPregledCena == null || this.noviPregledNaziv == "" || this.noviPregledCena < 0){
      alert("Polje ne sme biti prazno.")
      return
    }
    if(this.noviPregledTrajanjeSat > 3){
      alert("Pregled ne sme trajati više od tri sata.")
      return
    }
    // if(this.noviPregledTrajanjeMinut == null && this.noviPregledTrajanjeSat == null){
    //   this.noviPregledTrajanjeSat = 0
    //   this.noviPregledTrajanjeMinut = 30
    // }
    // if(this.noviPregledTrajanjeMinut == 0 && this.noviPregledTrajanjeSat == 0){
    //   this.noviPregledTrajanjeSat = 0
    //   this.noviPregledTrajanjeMinut = 30
    // }

    if(this.noviPregledTrajanjeSat == null || this.noviPregledTrajanjeSat == 0) this.noviPregledTrajanjeSat = 0;
    if(this.noviPregledTrajanjeMinut == null || this.noviPregledTrajanjeMinut == 0) this.noviPregledTrajanjeMinut = 30; 
    
    
    this.pregledService.insertPendingOrBazniPregled(this.korisnik.kor_ime, this.noviPregledNaziv, [this.noviPregledTrajanjeSat, this.noviPregledTrajanjeMinut], this.noviPregledCena, "pending", this.korisnik.specijalizacija, false).subscribe(resp=>{
      this.noviPregledNaziv = null
      this.noviPregledCena = null
      this.noviPregledTrajanjeMinut = null
      this.noviPregledTrajanjeSat = null
      alert("Uspešno podložen pregled.")
    })
  }

  dodajGodisnjiOdmor(){

    if(this.godisnji_pocetak == null || this.godisnji_pocetak == "" || this.godisnji_kraj == null || this.godisnji_kraj ==""){
      alert("Polja su obavezna.")
      return
    }

    if(this.korisnik.godisnji_kraj != null || this.korisnik.godisnji_kraj != undefined || this.korisnik.godisnji_pocetak != null || this.korisnik.godisnji_pocetak != undefined){
      alert("Lekar već ima zakazan godišnji odmor.")
      return
    }

    let now = new Date()
    let nowStr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
    let god_poc = new Date(this.godisnji_pocetak)
    let god_kraj = new Date(this.godisnji_kraj)
    let god_poc_str = god_poc.getFullYear() + "-" + (god_poc.getMonth() + 1) + "-" + god_poc.getDate()
    let god_kraj_str = god_kraj.getFullYear() + "-" + (god_kraj.getMonth() + 1) + "-" + god_kraj.getDate()


    //godisnji pocetak before now
    if(this.uporediDvaDatuma(god_poc_str, nowStr)){
      alert("Godišnji odmor mora biti u budućnosti.")
      return
    }

    //end before start
    if(this.uporediDvaDatuma(god_kraj_str, god_poc_str)){
      alert("Početak odmora mora biti pre kraja.")
      return
    }

    if( god_poc.getFullYear() == god_kraj.getFullYear() && god_poc.getMonth() == god_kraj.getMonth() && god_poc.getDate() == god_kraj.getDate()){
      alert("Godišnji odmor mora trajati barem jedan dan.")
      return
    }

    this.korisnikService.updateGodisnjiByKorIme(this.korisnik.kor_ime, god_poc_str, god_kraj_str).subscribe(resp=>[
      alert("Uspešno ažuriran godišnji odmor.")
    ])
  }

  dodajSlobodanDan(){

    if(this.slobodan_dan == null || this.slobodan_dan == ""){
      alert("Polje je obavezno.")
      return
    }

    let now = new Date()
    let nowStr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
    let slobodan_dan_date = new Date(this.slobodan_dan)
    let slobodan_dan_str = slobodan_dan_date.getFullYear() + "-" + (slobodan_dan_date.getMonth() + 1) + "-" + slobodan_dan_date.getDate()
    if(this.uporediDvaDatuma(slobodan_dan_str, nowStr)){
      alert("Slobodan dan mora biti u budućnosti.")
      return
    }

    for(let k = 0 ; k < this.korisnik.slobodan_dan.length ; ++k){
      let dat = new Date(this.korisnik.slobodan_dan.at(k))
      let y = dat.getFullYear()
      let m = dat.getMonth() + 1
      let d = dat.getDate()

      if( slobodan_dan_date.getFullYear() == y && slobodan_dan_date.getMonth() + 1 == m && slobodan_dan_date.getDate() == d){
        alert("Lekar je već slobodan tog dana.")
        return
      }
    }

    this.korisnikService.insertSlobodanDanByKorIme(this.korisnik.kor_ime, slobodan_dan_str).subscribe(resp=>{
      alert("Uspešno dodat slobodan dan.")
    })
  }

  getPregledZaIzvestaj(naziv: string, lekar: string, pocetak: number[], datum: string){
    this.pregledService.getZakazanPregledNoIzvestajByNazivLekarPocetakDatum(naziv, lekar, pocetak, datum).subscribe((preg: Pregled)=>{
      this.pregledZaIzvestaj = preg
    })
    

  }

  unesiIzvestaj(){
    if(this.izvestajDijagnoza == null || this.izvestajNaredni == null || this.izvestajRazlog == null || this.izvestajTerapija == null){
      alert("Polja moraju biti popunjena.")
      return
    }

    let now = new Date()
    let nowStr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
    let datum_date = new Date(this.izvestajNaredni)

    let datum_str = datum_date.getFullYear() + "-" + (datum_date.getMonth() + 1) + "-" + datum_date.getDate()
    if(this.uporediDvaDatuma(datum_str, nowStr)){
      alert("Sledeći pregled mora biti u budućnosti.")
      return
    }

    let prosli = new Date(this.pregledZaIzvestaj.datum)
    let prosli_str = prosli.getFullYear() + "-" + (prosli.getMonth() + 1) + "-" + prosli.getDate()

    if(this.uporediDvaDatuma(datum_str, prosli_str)){
      alert("Naredni pregled mora biti posle prošlog")
      return
    }

    this.pregledService.updateZakazanByNazivLekarPocetakDatum(this.pregledZaIzvestaj.naziv, this.pregledZaIzvestaj.lekar, this.pregledZaIzvestaj.pocetak, this.pregledZaIzvestaj.datum).subscribe(resp=>{
      let nar = new Date(this.izvestajNaredni)
      let naredniStr = nar.getFullYear() + "-" + (nar.getMonth() + 1) + "-" + nar.getDate()

      
      this.izvestajService.insertIzvestaj(prosli_str, this.pregledZaIzvestaj.pocetak, this.pregledZaIzvestaj.lekar, this.pregledZaIzvestaj.specijalizacija, this.izvestajRazlog, this.izvestajDijagnoza, this.izvestajTerapija, naredniStr, this.pregledZaIzvestaj.pacijent, this.pregledZaIzvestaj.naziv).subscribe(resp=>{
        this.pregledService.getZakazanPregledNoIzvestaj().subscribe((bezIzv: Pregled[])=>{
          this.preglediBezIzvestaja = []
          let now = new Date();
              let year = now.getFullYear();
              let month = now.getMonth() + 1;
              let day = now.getDate();
              let hour = now.getHours();
              let minute = now.getMinutes();
              let now_str = year + "-" + month + "-" + day
              //find pregledi bez izvestaja in the past 
              for(let i = 0 ; i < bezIzv.length ; ++i){
                let pregled_datum = new Date(bezIzv.at(i).datum)
                let year_pregled = pregled_datum.getFullYear();
                let month_pregled = pregled_datum.getMonth() + 1;
                let day_pregled = pregled_datum.getDate();
                let hour_pregled = pregled_datum.getHours();
                let minute_pregled = pregled_datum.getMinutes();
                if(year_pregled < year) this.preglediBezIzvestaja.push(bezIzv.at(i))
                else if(year_pregled == year){
                  if(month_pregled < month) this.preglediBezIzvestaja.push(bezIzv.at(i))
                  else if(month_pregled == month){
                    if(day_pregled < day) this.preglediBezIzvestaja.push(bezIzv.at(i))
                    else if(day_pregled == day){
                      if(hour_pregled < hour) this.preglediBezIzvestaja.push(bezIzv.at(i))
                      else if(hour_pregled == hour){
                        if(minute_pregled < minute) this.preglediBezIzvestaja.push(bezIzv.at(i))
                      }
                    }
                  }
                }
              }
          this.pregledZaIzvestaj = null
          this.izvestajService.getIzvestajByPacijent(this.pregledZaIzvestaj.pacijent).subscribe((izv: Izvestaj[])=>{
            alert("Uspešno podnet izveštaj.")
            this.izvestajiPacijenta = izv
          })
          
        })
        
      })
    })
  }

  proveraMinuta(){
    if(this.noviPregledTrajanjeMinut > 59 || this.noviPregledTrajanjeMinut < 0){
      this.noviPregledTrajanjeMinut = 0;
    }
  }
  proveraSati(){
    if(this.noviPregledTrajanjeSat > 3 || this.noviPregledTrajanjeSat < 0){
      this.noviPregledTrajanjeSat = 0;
    }
  }
  proveraCene(){
    if(this.noviPregledCena < 0){
      this.noviPregledCena = 0;
    }
  }

  //helper date functions

  //returns true if d1 < d2
  uporediDvaDatuma(d1: string, d2: string): boolean{
    let datum1 = new Date(d1)
    let datum2 = new Date(d2)
    if(datum1.getFullYear() < datum2.getFullYear()) return true
    else if(datum1.getFullYear() > datum2.getFullYear()) return false
    else{
      if(datum1.getMonth() < datum2.getMonth()) return true
      else if(datum1.getMonth() > datum2.getMonth()) return false
      else{
        if(datum1.getDate() < datum2.getDate()) return true
        else return false
      }
    }
  }
}
