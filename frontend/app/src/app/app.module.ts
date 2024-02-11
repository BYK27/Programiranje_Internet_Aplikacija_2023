import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarComponent } from './lekar/lekar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { provideUserIdleConfig } from 'angular-user-idle';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { LekarGostComponent } from './lekar-gost/lekar-gost.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IzvestajPrintableComponent } from './izvestaj-printable/izvestaj-printable.component';
import { QrCodeModule } from 'ng-qrcode';
import { FullCalendarModule } from '@fullcalendar/angular';
import { IzvestajPrintableAllComponent } from './izvestaj-printable-all/izvestaj-printable-all.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    PacijentComponent,
    LekarComponent,
    HomepageComponent,
    LoginMenadzerComponent,
    PromenaLozinkeComponent,
    LekarGostComponent,
    MenadzerComponent,
    IzvestajPrintableComponent,
    IzvestajPrintableAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FileUploadModule,
    MdbCarouselModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    QrCodeModule,
    FullCalendarModule
  ],
  //time given in seconds
  //waits for user to do nothing (checks every ping seconds) foe idle seconds
  //logsout after idle + timeout seconds
  providers: [provideUserIdleConfig({ idle: 600, timeout: 300, ping: 120 })],
  bootstrap: [AppComponent]
})
export class AppModule { }
