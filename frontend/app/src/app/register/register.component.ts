import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  constructor(private toastr: ToastrService, private korisnikService: KorisnikService, private router: Router) {}

  kor_ime: string
  lozinka: string
  lozinkaPotvrda: string
  ime: string
  prezime: string
  adresa: string
  telefon: string
  mejl: string
  slika: string

  alert: boolean


  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }

  register(){

    
    if(this.kor_ime == null || this.lozinka == null ||  this.lozinkaPotvrda == null|| this.ime == null || this.prezime == null || this.adresa == null || this.telefon == null || this.mejl == null ||
      this.kor_ime == "" || this.lozinka == "" ||  this.lozinkaPotvrda == "" || this.ime == "" || this.prezime == "" || this.adresa == "" || this.telefon == "" || this.mejl == ""){
      alert("Morate uneti sve neophodne podatke.")
    }else{

      if(this.lozinka != this.lozinkaPotvrda){
        alert("Morate potvrditi lozinku.")
        return
      }

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
      else{  
        

        if(this.alert == true){
          alert("Slika mora biti veličine od 100x100 do 300x300.")
          return
        }
        
        this.korisnikService.getKorisnikByKorIme(this.kor_ime).subscribe((data: Korisnik)=>{
          if(data != null) {
            alert("Korisničko ime mora biti jedinstveno.")
            return
          }
          this.korisnikService.getKorisnikByKorMail(this.mejl).subscribe((data2: Korisnik)=>{
            if(data2 != null){
              alert("Maksimalno jedan mejl po korisničkom nalogu.")
              return
            }
            if(this.slika == null) this.slika = "default.png"
            else this.slika = this.slika.substring(12,this.slika.length);   
            this.korisnikService.register(this.kor_ime, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.slika).subscribe(resp=>{
              this.router.navigate(['login'])
            })
          })
        })
        
      }
    }
  }

  test(){

    alert(this.lozinka)
    alert( this.lozinka.length)
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
  }

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
}
