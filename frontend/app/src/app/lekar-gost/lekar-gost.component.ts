import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-lekar-gost',
  templateUrl: './lekar-gost.component.html',
  styleUrls: ['./lekar-gost.component.css']
})
export class LekarGostComponent implements OnInit, AfterViewInit {

  constructor(private pregledService: PregledService, private router: Router, private korisnikService: KorisnikService, private cdr: ChangeDetectorRef, private userIdle: UserIdleService) { 
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {});
    this.userIdle.onTimeout().subscribe(() => {
      userIdle.stopWatching()
      alert("Vaša sesija je istekla.")
      sessionStorage.clear()
      router.navigate(['login'])
    });
  }

  @ViewChild(FullCalendarComponent, { static: true }) calendarComponent: FullCalendarComponent;

  ngOnInit(): void {
    let role = sessionStorage.getItem("role")
    if (role != "pacijent") this.router.navigate([''])


    this.lekar = JSON.parse(sessionStorage.getItem("lekar_gost"))
    this.pacijent = JSON.parse(sessionStorage.getItem("korisnik"))
    this.korisnikService.login(this.pacijent.kor_ime, this.pacijent.lozinka).subscribe((blueprint: Korisnik) => {
      if (blueprint.tip != 'pacijent') this.router.navigate([''])
      else {
        this.pregledService.getBazniPregledByLekar(this.lekar.kor_ime).subscribe((pregledi: Pregled[]) => {
          this.sviPregledi = pregledi
          this.pregledService.getZakazaniPregledByLekar(this.lekar.kor_ime).subscribe((zakazani: Pregled[]) => {
            this.zakazaniPregledi = zakazani
            let temp: any = []
            //this.calendarEvents = [];
            for (let i = 0; i < this.zakazaniPregledi.length; ++i) {

              //fix the date so it complies with the ISO 8601 format
              let novi_datum = new Date(this.zakazaniPregledi.at(i).datum)
              let novi_datum_string = ""
              if((novi_datum.getMonth()+1) < 10){
                if(novi_datum.getDate() < 10) novi_datum_string = novi_datum.getFullYear() + "-" +"0"+ (novi_datum.getMonth() + 1) + "-0" + novi_datum.getDate()
                else novi_datum_string = novi_datum.getFullYear() + "-" +"0"+ (novi_datum.getMonth() + 1) + "-" + novi_datum.getDate()
              }
              else {
                if(novi_datum.getDate() < 10) novi_datum_string = novi_datum.getFullYear() + "-" + (novi_datum.getMonth() + 1) + "-0" + novi_datum.getDate()
                else novi_datum_string = novi_datum.getFullYear() + "-" + (novi_datum.getMonth() + 1) + "-" + novi_datum.getDate()
              }
              


              //console.log(novi_datum_string)

              let eventDate = novi_datum_string
              let eventTime = this.zakazaniPregledi.at(i).pocetak[0] + ":" + this.zakazaniPregledi.at(i).pocetak[1]

              //get hours and minuts
              let h = this.zakazaniPregledi.at(i).pocetak[0] + this.zakazaniPregledi.at(i).trajanje[0]
              let m = 0;
              if(this.zakazaniPregledi.at(i).pocetak[1] + this.zakazaniPregledi.at(i).trajanje[1] >= 60){
                h += 1
                m = this.zakazaniPregledi.at(i).pocetak[1] + this.zakazaniPregledi.at(i).trajanje[1] - 60
              }
              else{
                m = this.zakazaniPregledi.at(i).pocetak[1] + this.zakazaniPregledi.at(i).trajanje[1]
              }

              

              const endTime = h + ":" + m;
              let dateTimeString = ""
              if(this.zakazaniPregledi.at(i).pocetak[1] < 10) dateTimeString = eventDate + "T" + this.zakazaniPregledi.at(i).pocetak[0] + ":0" + this.zakazaniPregledi.at(i).pocetak[1]
              else dateTimeString = eventDate + "T" + this.zakazaniPregledi.at(i).pocetak[0] + ":" + this.zakazaniPregledi.at(i).pocetak[1]
              let endTimeString = ""
              if(m < 10 ) endTimeString = eventDate + "T" + h + ":0" + m;
              else endTimeString = eventDate + "T" + h + ":" + m;
              
              let newEvent = {
                title: this.zakazaniPregledi.at(i).naziv ,
                start: dateTimeString,
                end:  endTimeString
              };
              temp.push(newEvent)
              this.calendarEvents.push(newEvent);
            }

           
            //let tester = { title: 'event 3', start: '2023-08-28T10:20', end: '2023-08-24T15:40' }
            // this.calendarEvents.push(tester)
            //temp.push(tester)
            this.calendarEvents = temp
            //this.calendarOptions.events = this.calendarEvents
            //console.log(this.calendarEvents)
            this.refreshCalendar()

          })
        })
      }
    })

  }

  ngAfterViewInit(): void {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.refetchEvents();
  }

  lekar: Korisnik;
  pacijent: Korisnik;
  sviPregledi: Pregled[]
  zakazaniPregledi: Pregled[]

  zakazanNaziv: string;
  zakazanDatum: string;


  nazivPregledaKalendar: string
  datumPregledaKalendar: string
  satPregledaKalendar: number
  minutPregledaKalendar: number
  pritisnut: boolean = false

  calendarEvents = [
    { title: 'event 1', start: '2023-08-23T14:50', end: '2023-08-23T18:50' },
    { title: 'event 2', start: '2023-08-24T10:20', end: '2023-08-24T15:20' }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    
    slotMinTime: '08:00:00',     // Set the minimum time to 8:00 AM
    slotDuration: '01:00:00',
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained

    //events: []

    events: [
      { title: 'event 1', start: '2023-08-23T14:50', end: '2023-08-23T18:50' },
      { title: 'event 2',  start: '2023-08-24T10:20', end: '2023-08-24T15:20'}
    ]
  };

  refreshCalendar() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.refetchEvents();
  }

  handleDateClick(arg) {
    //console.log(arg)
    let dat = new Date(arg.date)
    //alert(dat.getHours()+":"+dat.getMinutes())

    if(dat.getHours() >20 || dat.getHours() < 8){
      alert("Radno vreme doktora je od 8:00 do 20:00")
      return
    }

    //check if doctor is unavailable
    let now = new Date()
    let now_str = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()

    let pregledi_istog_dana: Pregled[] = []
    let zakazan_datum = new Date(arg.date)
    let taj_pregled: Pregled

    if (zakazan_datum.getHours() > 20 || zakazan_datum.getHours() < 8) {
      alert("Radno vreme svakog lekara je od 8:00 do 20:00.")
      return
    }

    let datum_string = zakazan_datum.getFullYear() + "-" + (zakazan_datum.getMonth() + 1) + "-" + zakazan_datum.getDate()


    if (this.uporediDvaDatuma(datum_string, now_str)) {
      alert("Zakazani termin mora biti u budućnosti.")
      return
    }

    //find if the doctor is on vacation
    if (this.uporediDvaDatuma(datum_string, this.lekar.godisnji_pocetak) && this.uporediDvaDatuma( datum_string, this.lekar.godisnji_kraj) || 
    this.uporediDvaDatuma(this.lekar.godisnji_pocetak, datum_string) && this.uporediDvaDatuma(this.lekar.godisnji_kraj, datum_string)) {
      
    }
    else{
      //doctor is away
      if(this.lekar.godisnji_kraj == undefined || this.lekar.godisnji_pocetak == undefined){

      }
      else{
        alert("Doktor je na godišnjem odmoru u datom terminu.")
        return
      }
    }
    //find if slobodan 
    for (let i = 0; i < this.lekar.slobodan_dan.length; ++i) {
      let temp = new Date(this.lekar.slobodan_dan[i])
      if (zakazan_datum.getFullYear() == temp.getFullYear() && zakazan_datum.getMonth() == temp.getMonth() && zakazan_datum.getDate() == temp.getDate()) {
        alert("Doktor ima slobodan dan u datom terminu.")
        return
      }
    }
    
    //end check

    let eventDate = dat.getFullYear() + "-" + (dat.getMonth() + 1) + "-" + dat.getDate()
    let eventTime = dat.getHours() + ":" + dat.getMinutes()
    let eventTimeend = dat.getHours() + ":" + (dat.getMinutes() + 30)

    this.datumPregledaKalendar = eventDate
    this.satPregledaKalendar = dat.getHours()
    this.minutPregledaKalendar = dat.getMinutes()

    this.pritisnut = true

    // let eventDate = ""
    // if((dat.getMonth()+1) < 10) eventDate = dat.getFullYear() + "-" + "0" + (dat.getMonth() + 1) + "-" + dat.getDate()
    // else eventDate = dat.getFullYear() + "-" + (dat.getMonth() + 1) + "-" + dat.getDate()
    

    // let dateTimeString = `${eventDate}T${eventTime}`;
    // let dateTimeStringend = `${eventDate}T${eventTimeend}`;
    // alert(dateTimeString)
    // let newEvent = {
    //   title: "placeholder",
    //   start: dateTimeString,
    //   end: dateTimeStringend
    // };
    // this.calendarEvents.push(newEvent);

  }


  zakaziKalendarom(){
    let taj_pregled: Pregled
    let pregledi_istog_dana: Pregled[] = []
    //find base pregled
    for (let i = 0; i < this.sviPregledi.length; ++i) {
      if (this.sviPregledi[i].naziv == this.nazivPregledaKalendar) taj_pregled = this.sviPregledi[i]
    }

    let zakazan_datum = new Date(this.datumPregledaKalendar)

    //find same day pregledi
    for (let i = 0; i < this.zakazaniPregledi.length; ++i) {

      let temp = new Date(this.zakazaniPregledi[i].datum)
      if (zakazan_datum.getFullYear() == temp.getFullYear() && zakazan_datum.getMonth() == temp.getMonth() && zakazan_datum.getDate() == temp.getDate()) {
        pregledi_istog_dana.push(this.zakazaniPregledi[i])
      }
    }

    //find at least one pregled time that overlaps
    let end = false;
    let i = 0
    let sat_crveni_pocetni = this.satPregledaKalendar
    let minut_crveni_pocetni = this.minutPregledaKalendar
    let sat_crveni_zavrsni = sat_crveni_pocetni + taj_pregled.trajanje[0]
    let minut_crveni_zavrsni = minut_crveni_pocetni + taj_pregled.trajanje[1]

    if(minut_crveni_zavrsni > 60){
      sat_crveni_zavrsni += 1
      minut_crveni_zavrsni -= 60
    }


    while (!end && i < pregledi_istog_dana.length) {
      let sat_zeleni_pocetni = pregledi_istog_dana[i].pocetak[0]
      let minut_zeleni_pocetni = pregledi_istog_dana[i].pocetak[1]
      let sat_zeleni_zavrsni = pregledi_istog_dana[i].pocetak[0] + pregledi_istog_dana[i].trajanje[0]
      let minut_zeleni_zavrsni = pregledi_istog_dana[i].pocetak[1] + pregledi_istog_dana[i].trajanje[1]


      while (minut_zeleni_zavrsni >= 60) {
        minut_zeleni_zavrsni -= 60;
        sat_zeleni_zavrsni += 1
      }

      if (this.da_li_se_preklapaju_sati(sat_zeleni_pocetni, minut_zeleni_pocetni, sat_zeleni_zavrsni, minut_zeleni_zavrsni,
        sat_crveni_pocetni, minut_crveni_pocetni, sat_crveni_zavrsni, minut_crveni_zavrsni)) end = true
      ++i
    }

    if(!end){
      this.pregledService.insertPregled(this.lekar.kor_ime, taj_pregled.naziv, taj_pregled.trajanje, [sat_crveni_pocetni, minut_crveni_pocetni], taj_pregled.cena, "zakazan", this.datumPregledaKalendar, this.pacijent.kor_ime, this.lekar.ordinacija, this.lekar.specijalizacija, false).subscribe(resp => {
        alert("Vaš pregled je zakazan.")
        this.ngOnInit()
      })
    }
    else{
      this.nazivPregledaKalendar = null
      this.datumPregledaKalendar = null
      this.satPregledaKalendar = null
      this.minutPregledaKalendar = null
      this.pritisnut= false
      alert("Izabrani termin je zauzet.")
      location.reload()
    }


  }

  nazad() {
    sessionStorage.removeItem("lekar_gost")
    this.router.navigate(['pacijent'])
  }

  //TODO: DELETE
  test() {
    alert(this.da_li_se_preklapaju_sati(12, 30, 15, 0, 10, 0, 15, 15))
  }

  //returns true if d1 < d2
  uporediDvaDatuma(d1: string, d2: string): boolean {
    let datum1 = new Date(d1)
    let datum2 = new Date(d2)
    if (datum1.getFullYear() < datum2.getFullYear()) return true
    else if (datum1.getFullYear() > datum2.getFullYear()) return false
    else {
      if (datum1.getMonth() < datum2.getMonth()) return true
      else if (datum1.getMonth() > datum2.getMonth()) return false
      else {
        if (datum1.getDate() < datum2.getDate()) return true
        else return false
      }
    }
  }

  //returns true if two periods have overlaps
  da_li_se_preklapa(datum_od_zeleni: string, datum_do_zeleni: string, datum_od_crveni: string, datum_do_crveni: string): boolean {
    if (
      (this.uporediDvaDatuma(datum_od_crveni, datum_od_zeleni) && this.uporediDvaDatuma(datum_od_crveni, datum_do_zeleni) &&
        this.uporediDvaDatuma(datum_do_crveni, datum_od_zeleni) && this.uporediDvaDatuma(datum_do_crveni, datum_do_zeleni)) ||
      (this.uporediDvaDatuma(datum_od_zeleni, datum_od_crveni) && this.uporediDvaDatuma(datum_od_zeleni, datum_do_crveni) &&
        this.uporediDvaDatuma(datum_do_zeleni, datum_od_crveni) && this.uporediDvaDatuma(datum_do_zeleni, datum_do_crveni))
    ) return false
    else return true
  }

  zakazi() {
    

    if (this.zakazanNaziv == null) {
      alert("Polje za željeni pregled mora biti popunjeno.")
      return
    }
    if (this.zakazanDatum == null) {
      alert("Polje za željeni datum mora biti popunjeno.")
      return
    }

    let now = new Date()
    let now_str = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()

    let pregledi_istog_dana: Pregled[] = []
    let zakazan_datum = new Date(this.zakazanDatum)
    let taj_pregled: Pregled

    if (zakazan_datum.getHours() > 20 || zakazan_datum.getHours() < 8) {
      alert("Radno vreme svakog lekara je od 8:00 do 20:00.")
      return
    }

    let datum_string = zakazan_datum.getFullYear() + "-" + (zakazan_datum.getMonth() + 1) + "-" + zakazan_datum.getDate()


    if (this.uporediDvaDatuma(datum_string, now_str)) {
      alert("Zakazani termin mora biti u budućnosti.")
      return
    }

    //find if the doctor is on vacation
    if (this.uporediDvaDatuma(datum_string, this.lekar.godisnji_pocetak) && this.uporediDvaDatuma( datum_string, this.lekar.godisnji_kraj) || 
    this.uporediDvaDatuma(this.lekar.godisnji_pocetak, datum_string) && this.uporediDvaDatuma(this.lekar.godisnji_kraj, datum_string)) {
      
    }
    else{
      //doctor is away
      if(this.lekar.godisnji_kraj == undefined || this.lekar.godisnji_pocetak == undefined){

      }
      else{
        alert("Doktor je na godišnjem odmoru u datom terminu.")
        return
      }
    }
    //find if slobodan 
    for (let i = 0; i < this.lekar.slobodan_dan.length; ++i) {
      let temp = new Date(this.lekar.slobodan_dan[i])
      if (zakazan_datum.getFullYear() == temp.getFullYear() && zakazan_datum.getMonth() == temp.getMonth() && zakazan_datum.getDate() == temp.getDate()) {
        alert("Doktor ima slobodan dan u datom terminu.")
        return
      }
    }

    //find base pregled
    for (let i = 0; i < this.sviPregledi.length; ++i) {
      if (this.sviPregledi[i].naziv == this.zakazanNaziv) taj_pregled = this.sviPregledi[i]
    }


    //find same day pregledi
    for (let i = 0; i < this.zakazaniPregledi.length; ++i) {

      let temp = new Date(this.zakazaniPregledi[i].datum)
      if (zakazan_datum.getFullYear() == temp.getFullYear() && zakazan_datum.getMonth() == temp.getMonth() && zakazan_datum.getDate() == temp.getDate()) {
        pregledi_istog_dana.push(this.zakazaniPregledi[i])
      }
    }


    //find at least one pregled time that overlaps
    let end = false;
    let i = 0
    let sat_crveni_pocetni = zakazan_datum.getHours()
    let minut_crveni_pocetni = zakazan_datum.getMinutes()
    let sat_crveni_zavrsni = sat_crveni_pocetni + taj_pregled.trajanje[0]
    let minut_crveni_zavrsni = minut_crveni_pocetni + taj_pregled.trajanje[1]
    //console.log(sat_crveni_pocetni, minut_crveni_pocetni, sat_crveni_zavrsni, minut_crveni_zavrsni)

    if(minut_crveni_zavrsni > 60){
      sat_crveni_zavrsni += 1
      minut_crveni_zavrsni -= 60
    }


    while (!end && i < pregledi_istog_dana.length) {
      let sat_zeleni_pocetni = pregledi_istog_dana[i].pocetak[0]
      let minut_zeleni_pocetni = pregledi_istog_dana[i].pocetak[1]
      let sat_zeleni_zavrsni = pregledi_istog_dana[i].pocetak[0] + pregledi_istog_dana[i].trajanje[0]
      let minut_zeleni_zavrsni = pregledi_istog_dana[i].pocetak[1] + pregledi_istog_dana[i].trajanje[1]

      while (minut_zeleni_zavrsni >= 60) {
        minut_zeleni_zavrsni -= 60;
        sat_zeleni_zavrsni += 1
      }


      if (this.da_li_se_preklapaju_sati(sat_zeleni_pocetni, minut_zeleni_pocetni, sat_zeleni_zavrsni, minut_zeleni_zavrsni,
        sat_crveni_pocetni, minut_crveni_pocetni, sat_crveni_zavrsni, minut_crveni_zavrsni)) end = true
      ++i
    }




    if (!end) {
      this.pregledService.insertPregled(this.lekar.kor_ime, taj_pregled.naziv, taj_pregled.trajanje, [sat_crveni_pocetni, minut_crveni_pocetni], taj_pregled.cena, "zakazan", datum_string, this.pacijent.kor_ime, this.lekar.ordinacija, this.lekar.specijalizacija, false).subscribe(resp => {
        
        alert("Vaš pregled je zakazan.")
        this.ngOnInit()
      })
    }
    else {
      alert("Izabrani termin je zauzet.")
    }

    // if(!end) alert("ne preklapau se")
    // else alert("prek")

  }

  //returns true if two time intervals overlap
  da_li_se_preklapaju_sati(sat_zeleni_pocetni: number, minut_zeleni_pocetni: number, sat_zeleni_zavrsni: number, minut_zeleni_zavrsni: number,
    sat_crveni_pocetni: number, minut_crveni_pocetni: number, sat_crveni_zavrsni: number, minut_crveni_zavrsni: number) {
    if (
      ((this.uporediDvaVremena(sat_crveni_pocetni, minut_crveni_pocetni, sat_zeleni_pocetni, minut_zeleni_pocetni) &&
        this.uporediDvaVremena(sat_crveni_zavrsni, minut_crveni_zavrsni, sat_zeleni_pocetni, minut_zeleni_pocetni)) ||
        ((this.uporediDvaVremena(sat_zeleni_pocetni, minut_zeleni_pocetni, sat_crveni_pocetni, minut_crveni_pocetni) &&
          (this.uporediDvaVremena(sat_zeleni_zavrsni, minut_zeleni_zavrsni, sat_crveni_pocetni, minut_crveni_pocetni)))))
    ) {return false;}
    else return true;
  }

  //returns true if zeleni < crveni
  //edge case: returns false if they're equal
  uporediDvaVremena(sat_zeleni: number, minut_zeleni: number, sat_crveni: number, minut_crveni: number): boolean {
    if (sat_zeleni < sat_crveni) return true
    else if (sat_zeleni > sat_crveni) return false
    else {
      if (minut_zeleni < minut_crveni) return true
      else return false
    }
  }

}
