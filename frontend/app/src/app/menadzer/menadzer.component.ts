import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { UpdateService } from '../services/update.service';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Specijalizacija } from '../models/specijalizacija';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { ObavestenjeService } from '../services/obavestenje.service';
import { Obavestenje } from '../models/obavestenje';
const URL = 'http://localhost:4000/api/upload';
@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit{

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  constructor(private toastr: ToastrService, private router: Router, private userIdle: UserIdleService, private updateService: UpdateService, private korisnikService: KorisnikService, private specijalizacijaService: SpecijalizacijaService, private pregledService: PregledService, private obavestenjeService: ObavestenjeService){
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {});
    this.userIdle.onTimeout().subscribe(() => {
      userIdle.stopWatching()
      alert("Vaša sesija je istekla.")
      sessionStorage.clear()
      router.navigate(['login_menadzer'])
    });
  }
  ngOnInit(): void {
    let role = sessionStorage.getItem("role")
    if(role != "menadzer") this.router.navigate([''])
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
    this.rezim = "pregled"
    this.korisnik = JSON.parse(sessionStorage.getItem("korisnik"))

    this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((blueprint: Korisnik)=>{
      if(blueprint.tip != 'menadzer') this.router.navigate([''])
      else{
        this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
          this.sviLekari = lekari
          this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
            this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
            this.korisnikService.getKorisnikByNeregistrovan().subscribe((nereg: Korisnik[])=>{
              this.neregistrovaniKorisnici = nereg
              this.specijalizacijaService.getAllSpecijalizacija().subscribe((spec: Specijalizacija[])=>{
                this.sveSpecijalizacije = spec
                this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
                  this.sviBazniPregledi = bazni
                  this.pregledService.getAllPendingPregled().subscribe((pend: Pregled[])=>{
                    this.sviPendingPregledi = pend
                  })
                })
              })
            })
          })
        })
      }
    })
  }

  korisnik: Korisnik
  sviLekari: Korisnik[]
  sviPacijenti: Korisnik[]
  sveSpecijalizacije: Specijalizacija[]
  sviPendingPregledi: Pregled[]
  rezim: string

  taj_lekar: Korisnik
  taj_lekar_kor_ime: string

  novoKorIme: string
  novoIme: string
  novoPrezime: string
  novaAdresa: string
  noviMejl: string
  noviTelefon: string
  novaLicenca: string
  novaSpecijalizacija: string
  novaOrdinacija: string
  novaSlika: string

  kor_ime: string
  lozinka: string
  ime: string
  prezime: string
  adresa: string
  telefon: string
  mejl: string
  slika: string
  licenca: string
  specijalizacija: string
  ordinacija: string

  neregistrovaniKorisnici: Korisnik[]

  dodataSpecijalizacija: string
  sviBazniPregledi: Pregled[]
  azuriraniNaziv: string
  azuriraniSat: number
  azuriraniMinut: number
  azuriranaCena: number
  azuriraniPregled: Pregled
  azuriraniPregledStr: string
  azuriranaSpecijalizacija: string

  akcijaNaziv: string

  rezimPregled(){this.rezim = "pregled"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}
  rezimAzurirajPacijente(){this.rezim = "azuriraj_pacijente"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}
  rezimDodajLekare(){this.rezim = "dodaj_lekare"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}
  rezimAzurirajLekare(){this.rezim = "azuriraj_lekare"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}
  rezimRegistracija(){this.rezim = "registracije"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}
  rezimLekarskiZahtevi(){this.rezim = "lekarski_zahtevi"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}
  rezimAkcije(){this.rezim = "akcije"; this.taj_lekar_kor_ime = null; this.taj_lekar = null}


  azurirajKorIme(){
    if(this.novoKorIme == null || this.novoKorIme == "") {
      alert("Polje ne sme biti prazno.")
      return
    }

    this.updateService.updateImeByKorIme(this.taj_lekar.kor_ime, this.novoIme).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novoIme = null
          })
        })
      })
    })
  }

  azurirajIme(){
    if(this.novoIme == null || this.novoIme == "") {
      alert("Polje ne sme biti prazno.")
      return
    }

    this.updateService.updateImeByKorIme(this.taj_lekar.kor_ime, this.novoIme).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novoIme = null
          })
        })
      })
    })
  }

  azurirajPrezime(){
    if(this.novoPrezime == null || this.novoPrezime == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updatePrezimeByKorIme(this.taj_lekar.kor_ime, this.novoPrezime).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novoPrezime = null
          })
        })
      })
    })
  }

  azurirajAdresu(){
    if(this.novaAdresa == null || this.novaAdresa == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateAdresuByKorIme(this.taj_lekar.kor_ime, this.novaAdresa).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novaAdresa = null
          })
        })
      })
    })
  }

  azurirajTelefon(){
    if(this.noviTelefon == null || this.noviTelefon == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateTelefonByKorIme(this.taj_lekar.kor_ime, this.noviTelefon).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.noviTelefon = null
          })
        })
      })
    })
  }

  azurirajLicencu(){
    
    if(this.novaLicenca == null || this.novaLicenca == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateLicencaByKorIme(this.taj_lekar.kor_ime, this.novaLicenca).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novaLicenca = null
          })
        })
      })
    })
  }

  azurirajSpecijalizaciju(){
    if(this.novaSpecijalizacija == null || this.novaSpecijalizacija == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateSpecijalizacijaByKorIme(this.taj_lekar.kor_ime, this.novaSpecijalizacija).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novaSpecijalizacija = null
          })
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
    this.updateService.updateSlikaByKorIme(this.taj_lekar.kor_ime, this.novaSlika).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor     
            this.novaSlika = null 
          })
        })
      })
    })
  }

  azurirajOrdinaciju(){
    if(this.novaOrdinacija == null || this.novaOrdinacija == "") {
      alert("Polje ne sme biti prazno.")
      return
    }
    this.updateService.updateOrdinacijaByKorIme(this.taj_lekar.kor_ime, this.novaOrdinacija).subscribe((resp)=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti
          this.korisnikService.getKorisnikByKorIme(this.taj_lekar.kor_ime).subscribe((kor: Korisnik)=>{
            this.taj_lekar = kor
            this.novaOrdinacija = null
          })
        })
      })
    })
  }


  taj_lekar_azur(){
    this.korisnikService.getKorisnikByKorIme(this.taj_lekar_kor_ime).subscribe((lekar: Korisnik)=>{
      this.taj_lekar = lekar
    })
  }

  obrisi(){
    this.updateService.deleteByKorIme(this.taj_lekar.kor_ime).subscribe(resp=>{
      this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
        this.sviLekari = lekari
        this.korisnikService.getAllPacijenti().subscribe((pacijenti: Korisnik[])=>{
          this.sviPacijenti = pacijenti.filter(pac => pac.status == "registrovan")
          this.taj_lekar = null
        })
      })
    })
  }

  register(){
    if(this.kor_ime == null || this.lozinka == null || this.ime == null || this.prezime == null|| this.adresa == null || 
      this.telefon == null || this.mejl == null || this.licenca == null || this.specijalizacija == null || this.ordinacija == null ||
      this.kor_ime == "" || this.lozinka == "" || this.ime == "" || this.prezime == "" || this.adresa == "" || 
      this.telefon == "" || this.mejl == "" || this.licenca == "" || this.specijalizacija == "" || this.ordinacija == ""){
        
        alert("Morate uneti sva polja.")
      }
    else{
      


      let regex1 = /^[a-zA-Z](?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,14}$/
      let regex2 = /(.)\1\1/
      if(!regex1.test(this.lozinka))
      {
        alert("Lozinka mora početi slovom, imati od 8 do 14 karaktera, barem jedno veliko slovo, broj i specijalni karakter.")
        return
      }
      if(regex2.test(this.lozinka)){
        alert("Lozinka ne sme imati dva slova koja se ponavljaju.")
        return
      }

      this.korisnikService.getKorisnikByKorIme(this.kor_ime).subscribe((data1: Korisnik)=>{
        if(data1 != null){
          alert("Korisničko ime mora biti jedinstveno.")
          return
        }
        this.korisnikService.getKorisnikByKorMail(this.mejl).subscribe((data2: Korisnik)=>{
          if(data2 != null){
            alert("Mejl mora biti jedinstven.")
            return
          }

          if(this.slika == null) this.slika = "default.png"
          else this.slika = this.slika.substring(12,this.slika.length);   
          this.korisnikService.registerLekar(this.kor_ime, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.licenca, this.specijalizacija, this.ordinacija, this.slika).subscribe(resp=>{
            this.korisnikService.getAllLekari().subscribe((lekari: Korisnik[])=>{
              this.kor_ime = null
              this.lozinka = null
              this.ime = null
              this.prezime = null
              this.adresa = null
              this.telefon = null
              this.mejl = null
              this.licenca = null
              this.specijalizacija = null
              this.ordinacija = null
              this.slika = null
              this.sviLekari = lekari
              alert("Lekar uspešno registrovan.")
            })
          })

        })
      })

      
    }
  }

  potvrdi(kor_ime: string){
    this.updateService.updateStatusByKorIme(kor_ime, "registrovan").subscribe(resp=>{
      this.korisnikService.getKorisnikByNeregistrovan().subscribe((nereg: Korisnik[])=>{
        this.neregistrovaniKorisnici = nereg
      })
    })
  }

  odbij(kor_ime: string){
    this.updateService.updateStatusByKorIme(kor_ime, "odbijen").subscribe(resp=>{
      this.korisnikService.getKorisnikByNeregistrovan().subscribe((nereg: Korisnik[])=>{
        this.neregistrovaniKorisnici = nereg
      })
    })
  }

  dodajSpecijalizaciju(){
    if(this.dodataSpecijalizacija == null) {
      alert("Polje ne sme biti prazno.")
      return 
    }
    this.specijalizacijaService.insertSpecijalizacija(this.dodataSpecijalizacija).subscribe(resp=>{
      this.specijalizacijaService.getAllSpecijalizacija().subscribe((spec: Specijalizacija[])=>{
        this.sveSpecijalizacije = spec
        alert("Specijalizacija uspešno dodata")
      })
    })
  }

  azurStaviPregled(a: string){
    this.pregledService.getBazniPregledByNaziv(a).subscribe((preg: Pregled)=>{
      this.azuriraniPregled = preg
    })
  }
  azurNazivPregleda(){
    if(this.azuriraniNaziv == null || this.azuriraniNaziv == ""){
      alert("Polje ne sme biti prazno.")
      return
    }
    this.pregledService.updateNazivByNaziv(this.azuriraniPregled.naziv, this.azuriraniNaziv).subscribe(resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
      this.sviBazniPregledi = bazni
      this.azuriraniNaziv = null
      alert("Naziv uspešno ažuriran.")
      })
    })
  }
  azurCenuPregleda(){
    if(this.azuriranaCena == null || this.azuriranaCena <= 0){
      alert("Polje ne sme biti prazno.")
      return
    }
    this.pregledService.updateCenaByNaziv(this.azuriraniPregled.naziv, this.azuriranaCena).subscribe(resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
        this.azuriraniNaziv = null
        this.azuriranaCena = null
        alert("Cena uspešno ažuriran.")
        })
      })
  }
  azurTrajanjePregleda(){

    if(this.azuriraniSat == 0 && this.azuriraniMinut == 0){
      this.azuriraniSat = 0
      this.azuriraniMinut = 30
    }
    if(this.azuriraniSat == null && this.azuriraniMinut == null){
      this.azuriraniSat = 0
      this.azuriraniMinut = 30
    }


    this.pregledService.updateTrajanjevByNaziv(this.azuriraniPregled.naziv, this.azuriraniSat, this.azuriraniMinut).subscribe(resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
        this.azuriraniNaziv = null
        this.azuriraniSat = null
        this.azuriraniMinut = null
        alert("Trajanje uspešno ažurirano.")
        })
    })
  }
  deletePregled(){
    this.pregledService.deletePregled(this.azuriraniPregled.naziv).subscribe((resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
        this.azuriraniNaziv = null
        this.azuriraniPregled = null
        alert("Pregled uspešno obrisan.")
        })
    }))
  }

  azurSpecijalizacijuPregleda(){
    if(this.azuriranaSpecijalizacija == null || this.azuriranaSpecijalizacija == ""){
      alert("Polje ne sme biti prazno.")
      return
    }
    this.pregledService.updateSpecijalizacijaByNaziv(this.azuriraniPregled.naziv, this.azuriranaSpecijalizacija).subscribe(resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
        this.azuriraniNaziv = null
        this.azuriranaSpecijalizacija = null
        alert("Specijalizacija uspešno ažuriran.")
        })
      })
  }
  dodajAkciju(){

    if(this.akcijaNaziv == null || this.akcijaNaziv == ""){
      alert("Akcija mora imati naziv.")
      return
    }
    let maxid = 0;
    this.obavestenjeService.getAllObavestenja().subscribe((svaObv: Obavestenje[])=>{
      for(let i = 0 ; i < svaObv.length ; ++i){
        if(svaObv.at(i).id > maxid) maxid = svaObv.at(i).id
      }

      maxid = maxid + 1

      let registrovani_pacijenti = this.sviPacijenti.filter(p => p.status == "registrovan")

      for(let i = 0 ; i < registrovani_pacijenti.length ; ++i){
        this.obavestenjeService.obavestiSvePacijente(this.akcijaNaziv, registrovani_pacijenti.at(i).kor_ime, maxid).subscribe(resp=>{
        })
        maxid = maxid + 1

      }
      alert("Akcija uspešno uneta.")
    })
  }

  potvrdiNoviPregled(naziv: string){
    this.pregledService.updateStatusByNaziv(naziv, "bazni").subscribe(resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
        this.pregledService.getAllPendingPregled().subscribe((pend: Pregled[])=>{
          this.sviPendingPregledi = pend
        })
      })
    })
  }
  odbijNoviPregled(naziv: string){
    this.pregledService.updateStatusByNaziv(naziv, "odbijen").subscribe(resp=>{
      this.pregledService.getAllBazniPregled().subscribe((bazni: Pregled[])=>{
        this.sviBazniPregledi = bazni
        this.pregledService.getAllPendingPregled().subscribe((pend: Pregled[])=>{
          this.sviPendingPregledi = pend
        })
      })
    })
  }


  proveraMinuta(){
    if(this.azuriraniMinut > 59 || this.azuriraniMinut < 0){
      this.azuriraniMinut = 0;
    }
  }
  proveraSati(){
    if(this.azuriraniSat > 3 || this.azuriraniSat < 0){
      this.azuriraniSat = 0;
    }
  }
  proveraCene(){
    if(this.azuriranaCena < 0){
      this.azuriranaCena = 0;
    }
  }
}
