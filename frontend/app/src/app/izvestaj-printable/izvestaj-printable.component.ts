import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Izvestaj } from '../models/izvestaj';
import { UserIdleService } from 'angular-user-idle';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Korisnik } from '../models/korisnik';

const URL = 'http://localhost:4000/api/upload';


@Component({
  selector: 'app-izvestaj-printable',
  templateUrl: './izvestaj-printable.component.html',
  styleUrls: ['./izvestaj-printable.component.css']
})
export class IzvestajPrintableComponent implements OnInit{
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  

  constructor(private router: Router, private korisnikService: KorisnikService, private userIdle: UserIdleService, private http:HttpClient, private toastr: ToastrService){
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {});
    this.userIdle.onTimeout().subscribe(() => {
      userIdle.stopWatching()
      alert("Vaša sesija je istekla.")
      sessionStorage.clear()
      router.navigate(['login'])
    });
  }

  uri = 'http://localhost:4000'
  apiUrl = 'http://localhost:4000/send-email'
  tester: string;
  korisnik: Korisnik

  uploaded = false;

  ngOnInit(): void {
    let role = sessionStorage.getItem("role")
    if(role != "pacijent") this.router.navigate([''])

    this.korisnik = JSON.parse(sessionStorage.getItem('korisnik'))
    this.korisnikService.login(this.korisnik.kor_ime, this.korisnik.lozinka).subscribe((blueprint: Korisnik)=>{
      if(blueprint.tip != "pacijent"){
        this.router.navigate([''])
      }
    })

    this.izvestaj = JSON.parse(sessionStorage.getItem('izvestaj'))

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }

  @ViewChild('pdfTable') pdfTable: ElementRef;
   
  public downloadAsPDF() {
    const doc = new jsPDF();
    
    const pdfTable = this.pdfTable.nativeElement;
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
    this.tester = html
      
    const documentDefinition = { content: html };

    pdfMake.createPdf(documentDefinition).open(); 
    //pdfMake.createPdf(documentDefinition).download();

    //console.log()
    //FileSaver.saveAs(pdfMake.createPdf(documentDefinition), "temp1.txt")
    //console.log(doc)

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBlob((blob) => {
      FileSaver.saveAs(blob, "izvestaj.pdf")
      //this.uploader.uploadItem(blob)
      const formData = new FormData();
      formData.append("izvestaj", blob);

      let naziv = "izvestaj-" + this.izvestaj.datum + this.izvestaj.lekar + this.izvestaj.pacijent + this.izvestaj.vreme +".pdf"
      const emailData = {
        'from': 'yourmail@mail.com',
        'to': this.korisnik.mejl,
        'subject': 'Izveštaj',
        'text': 'Vaš izveštaj je na stranici ' + naziv
      };
  
      this.sendEmail(emailData).subscribe(resp=>{
  
      })

      let file = new File([blob],naziv ,  { type: 'application/pdf' });
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      };
      this.uploader.onCompleteItem = (item: any, status: any) => {
        console.log('Uploaded File Details:', item);
        this.toastr.success('File successfully uploaded!');
      };
      const file_item = new FileItem(this.uploader, file, {url: URL});
      file_item.withCredentials = false;
      this.uploader.queue.push(file_item);
      
      this.uploader.uploadAll()

      this.uploaded = true;
      this.tester = "http://localhost:4000/uploads/" + naziv
      
    });
  }

  test(naziv: string){
    const emailData = {
      'from': 'yourmail@mail.com',
      'to': 'Vaš izveštaj je na stranici ' ,
      'subject': 'Hello from Angular App 2',
      'text': 'This is a test email sent from my Angular app.'
    };

    this.sendEmail(emailData).subscribe(resp=>{

    })
  }

  sendEmail(emailData: any) {
    return this.http.post(this.apiUrl, emailData);
  }

  izvestaj: Izvestaj

  nazad(){
    sessionStorage.removeItem('izvestaj')
    this.router.navigate(['pacijent'])
  }
}
