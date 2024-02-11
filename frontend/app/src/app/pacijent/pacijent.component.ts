import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { UpdateService } from '../services/update.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { LekarPretragaService } from '../services/lekar-pretraga.service';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { Izvestaj } from '../models/izvestaj';
import { IzvestajService } from '../services/izvestaj.service';
import { ObavestenjeService } from '../services/obavestenje.service';
import { Obavestenje } from '../models/obavestenje';
const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit{
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  constructor(private korisnikService: KorisnikService, private router: Router, private userIdle: UserIdleService, private updateService: UpdateService, private toastr: ToastrService ,private lekarPretragaService: LekarPretragaService, private pregledService: PregledService, private izvestajService: IzvestajService, private obavestenjeService: ObavestenjeService){
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

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };

    let role = sessionStorage.getItem("role")
    if(role != "pacijent") this.router.navigate([''])
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"))
    
    this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((blueprint: Korisnik)=>{
      if(blueprint.tip != 'pacijent') this.router.navigate([''])
      let obavestenjeMaxId = 0;
      this.obavestenjeService.getAllObavestenja().subscribe((svaObv: Obavestenje[])=>{
      for(let k = 0 ; k < svaObv.length ; ++k){
        if(svaObv.at(k).id > obavestenjeMaxId ) obavestenjeMaxId = svaObv.at(k).id
      }
      obavestenjeMaxId = obavestenjeMaxId + 1
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate()  + 1)
      let tomorrowYear = tomorrow.getFullYear();
      let tomorrowMonth = tomorrow.getMonth() + 1;
      let tomorrowDay = tomorrow.getDate();
      let tomorrowHour = tomorrow.getHours();
      let tomorrowMinute = tomorrow.getMinutes();
      
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.pregledService.getPregledByPacijent(this.korisnik.kor_ime).subscribe((pregledi: Pregled[])=>{
          let preg = pregledi
          let now = new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let day = now.getDate();
          let hour = now.getHours();
          let minute = now.getMinutes();
          let now_str = year + "-" + month + "-" + day
          preg = preg.filter(p => p.status == "zakazan")

          //iterate through all pregledi
          for(let i = 0 ; i < preg.length ; ++i){
            let pregled_datum = new Date(preg[i].datum)
            let year_pregled = pregled_datum.getFullYear();
            let month_pregled = pregled_datum.getMonth() + 1;
            let day_pregled = pregled_datum.getDate();
            let hour_pregled = pregled_datum.getHours();
            let minute_pregled = pregled_datum.getMinutes();
            
            //check if pregled is in the future
            if(year_pregled > year) this.buduci_pregledi.push(preg[i])
            else if(year_pregled == year){
              if(month_pregled > month) this.buduci_pregledi.push(preg[i])
              else if(month_pregled == month){
                if(day_pregled > day) this.buduci_pregledi.push(preg[i])
                else if(day_pregled == day){
                  if(hour_pregled > hour) this.buduci_pregledi.push(preg[i])
                  else if(hour_pregled == hour){
                    if(minute_pregled > minute) this.buduci_pregledi.push(preg[i])
                  }
                }
              }
            }
          }

          let datum_24h = new Date(now.getTime() + 24 * 60 * 60 * 1000)
          //check if pregled is 24h away
          for(let j = 0 ;  j < this.buduci_pregledi.length ; ++j){
            
            let datum_pregleda = new Date(this.buduci_pregledi.at(j).datum)
            
            //they are less than 24hours away
            if(datum_pregleda < datum_24h && this.buduci_pregledi.at(j).obavesten == false){
              obavestenjeMaxId = obavestenjeMaxId + j
              this.pregledService.updateObavestenByNazivLekarPocetakDatum(this.buduci_pregledi.at(j).naziv, this.buduci_pregledi.at(j).lekar, this.buduci_pregledi.at(j).pocetak, this.buduci_pregledi.at(j).datum).subscribe(resp1=>{
                let obav = "Vaš pregled " + this.buduci_pregledi.at(j).naziv + " sa početkom u " + this.buduci_pregledi.at(j).pocetak[0] + ":" + (this.buduci_pregledi.at(j).pocetak[1] < 10 ? "0" : "") +  this.buduci_pregledi.at(j).pocetak[1] + " je za 24 časa."
                this.obavestenjeService.obavestiSvePacijente(obav, this.buduci_pregledi.at(j).pacijent, obavestenjeMaxId).subscribe(resp2=>{
                  this.obavestenjeService.getObavestenjaByPacijent(this.korisnik.kor_ime).subscribe((obv: Obavestenje[])=>{
                    this.svaObavestenja = obv
                  })
                })
              })
            }
          }

          this.buduci_pregledi = this.buduci_pregledi.sort((p1, p2)=>{
            return p1.pocetak[1] - p2.pocetak[1]
          })

          this.buduci_pregledi = this.buduci_pregledi.sort((p1, p2)=>{
            return p1.pocetak[0] - p2.pocetak[0]
          })

          this.buduci_pregledi = this.buduci_pregledi.sort((p1, p2)=>{
            return new Date(p1.datum).getTime() - new Date(p2.datum).getTime()
          })

          this.izvestajService.getIzvestajByPacijent(this.korisnik.kor_ime).subscribe((izv: Izvestaj[])=>{
            this.sviIzvestaji = izv

            this.sviIzvestaji = this.sviIzvestaji.sort((i1, i2)=>{
              return i2.vreme[1] - i1.vreme[1]
            })
            this.sviIzvestaji = this.sviIzvestaji.sort((i1, i2)=>{
              return i2.vreme[0] - i1.vreme[0]
            })
            this.sviIzvestaji = this.sviIzvestaji.sort((i1, i2)=>{
              return new Date(i2.datum).getTime() - new Date(i1.datum).getTime()
            })
            
            this.obavestenjeService.getObavestenjaByPacijent(this.korisnik.kor_ime).subscribe((obavestenja: Obavestenje[])=>{
              this.svaObavestenja = obavestenja.sort((o1, o2)=>{
                return o2.id - o1.id
              })
            })
          })
          
        })
      })

    })
    })

    

    
  }


  korisnik: Korisnik
  rezim: string
  novoIme: string
  novoPrezime: string
  novaAdresa: string
  noviTelefon: string
  novaSlika: string

  sviLekari: Korisnik[]
  imeS: boolean
  prezimeS: boolean
  specijalizacijaS: boolean
  ordinacijaS: boolean
  imePretraga: string
  prezimePretraga: string
  specijalizacijaPretraga: string
  ordinacijaPretraga: string
  rezultatiPretraga: Korisnik[]
  pretrazio: boolean

  buduci_pregledi: Pregled[] = []

  sviIzvestaji: Izvestaj[]
  svaObavestenja: Obavestenje[]

  check(){
    var img = new Image
    img.src = "http://localhost:4000/uploads/" + this.korisnik.slika
    console.log(img.width)
    console.log(img.height)
  }

  rezimProfil(){
    this.rezim = "profil"
  }

  rezimLekari(){
    this.rezim = "lekari"
  }

  rezimPregledi(){
    this.rezim = "pregledi"
  }

  rezimObavestenja(){
    this.rezim = "obavestenja"
  }

  azurirajIme(){
    if(this.novoIme == null) {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateImeByKorIme(this.korisnik.kor_ime, this.novoIme).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novoIme = null;
      })
    })
  }

  azurirajPrezime(){
    if(this.novoPrezime == null) {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updatePrezimeByKorIme(this.korisnik.kor_ime, this.novoPrezime).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novoPrezime = null;
      })
    })
  }

  azurirajAdresu(){
    if(this.novaAdresa == null) {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateAdresuByKorIme(this.korisnik.kor_ime, this.novaAdresa).subscribe((resp)=>{
      sessionStorage.removeItem('korisnik')
      this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((data: Korisnik)=>{
        this.korisnik = data
        sessionStorage.setItem("korisnik", JSON.stringify(data))
        this.novaAdresa = null;
      })
    })
  }

  azurirajTelefon(){
    if(this.noviTelefon == null) {
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
        this.novaSlika = null;
      })
    })
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

  sortOrdinacija(){
    if(this.ordinacijaS){
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return parseInt(l1.ordinacija) - parseInt(l2.ordinacija)
      })
    }
    else{
      this.sviLekari = this.sviLekari.sort((l1, l2)=>{
        return parseInt(l2.ordinacija) - parseInt(l1.ordinacija)
      })
    }
    this.ordinacijaS = !this.ordinacijaS
  }

  pretrazi(){

    if(this.prezimePretraga == null) this.prezimePretraga = ""
    if(this.imePretraga == null) this.imePretraga = ""
    if(this.specijalizacijaPretraga == null) this.specijalizacijaPretraga = ""
    if(this.ordinacijaPretraga == null) this.ordinacijaPretraga = ""
    this.rezultatiPretraga = this.sviLekari.filter(lekar => lekar.ime.includes(this.imePretraga) && lekar.prezime.includes(this.prezimePretraga) && lekar.ordinacija.includes(this.ordinacijaPretraga) && lekar.specijalizacija.includes(this.specijalizacijaPretraga))
  }

  posetiLekara(kor_ime){
    this.korisnikService.getKorisnikByKorIme(kor_ime).subscribe((lekar: Korisnik)=>{
      sessionStorage.setItem("lekar_gost", JSON.stringify(lekar))
      this.router.navigate(['lekar_gost'])
    })
  }

  otkaziPregled(naziv: string, lekar: string, sat: number, minut: number, datum: string){
    let dtm = new Date(datum)
    let datumStr = dtm.getFullYear()+ "-" + (dtm.getMonth() + 1) + "-" + dtm.getDate()
    console.log(naziv, lekar, sat, minut, datumStr)
    this.pregledService.otkaziPregled(naziv, lekar, sat, minut, datumStr, "").subscribe(resp=>{
      this.buduci_pregledi = []
      this.pregledService.getPregledByPacijent(this.korisnik.kor_ime).subscribe((pregledi: Pregled[])=>{
        let preg = pregledi
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();

        preg = preg.filter(p => p.status == "zakazan")

        console.log(preg)

        for(let i = 0 ; i < preg.length ; ++i){

          

          let pregled_datum = new Date(preg[i].datum)
          let year_pregled = pregled_datum.getFullYear();
          let month_pregled = pregled_datum.getMonth() + 1;
          let day_pregled = pregled_datum.getDate();
          let hour_pregled = pregled_datum.getHours();
          let minute_pregled = pregled_datum.getMinutes();

          if(year_pregled > year) this.buduci_pregledi.push(preg[i])
          else if(year_pregled == year){
            if(month_pregled > month) this.buduci_pregledi.push(preg[i])
            else if(month_pregled == month){
              if(day_pregled > day) this.buduci_pregledi.push(preg[i])
              else if(day_pregled == day){
                if(hour_pregled > hour) this.buduci_pregledi.push(preg[i])
                else if(hour_pregled == hour){
                  if(minute_pregled > minute) this.buduci_pregledi.push(preg[i])
                }
              }
            }
          }
        }

        this.buduci_pregledi = this.buduci_pregledi.sort((p1, p2)=>{
          return p1.pocetak[1] - p2.pocetak[1]
        })

        this.buduci_pregledi = this.buduci_pregledi.sort((p1, p2)=>{
          return p1.pocetak[0] - p2.pocetak[0]
        })

        this.buduci_pregledi = this.buduci_pregledi.sort((p1, p2)=>{
          return new Date(p1.datum).getTime() - new Date(p2.datum).getTime()
        })
    })
  }
  )}

  readUrl(event: any) {
    const image: HTMLImageElement = new Image();
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = ((loadEvent: any) => {
      image.src = loadEvent.target.result;
      
    });
    image.onload = function(){
      console.log(image.width)
      console.log(image.height);
      if(image.height < 100 || image.height > 300 || image.width < 100 || image.width > 300 ){
        alert("Slika mora biti veličine od 100x100 do 300x300.")
        location.reload()
      }
    };
    myReader.readAsDataURL(file);
  } 

  printIzvestaj(datum: string, sat: number, minut: number, lekar: string, pacijent: string){
    this.izvestajService.getIzvestajByDatumVremeLekarPacijent(datum, sat, minut, lekar, pacijent).subscribe((izv: Izvestaj)=>{
      sessionStorage.setItem('izvestaj', JSON.stringify(izv))
      this.router.navigate(['izvestaj_printable'])
    })
  }

  printSviIzvestaji(){
    this.izvestajService.getIzvestajByPacijent(this.korisnik.kor_ime).subscribe((izv: Izvestaj[])=>{
      console.log(izv)
      sessionStorage.setItem('izvestaji', JSON.stringify(izv))
    })
  }

  procitajObavestenje(id: number){
    this.obavestenjeService.updateObavestenjeStatusById(id).subscribe(resp=>{
      this.obavestenjeService.getObavestenjaByPacijent(this.korisnik.kor_ime).subscribe((obavestenje: Obavestenje[])=>{
        this.svaObavestenja = obavestenje.sort((o1, o2)=>{
          return o2.id - o1.id
        })
      })
    })
  }

  //returns true if d1 < d2
  //returns false if d1 >= d2
  //returns true if !(d1 >= d2)
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
