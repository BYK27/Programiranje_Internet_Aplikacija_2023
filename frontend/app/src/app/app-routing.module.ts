import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarComponent } from './lekar/lekar.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { LekarGostComponent } from './lekar-gost/lekar-gost.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { IzvestajPrintableComponent } from './izvestaj-printable/izvestaj-printable.component';
import { IzvestajPrintableAllComponent } from './izvestaj-printable-all/izvestaj-printable-all.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "login_menadzer", component: LoginMenadzerComponent},
  {path: "pacijent", component: PacijentComponent},
  {path: "lekar", component: LekarComponent},
  {path: "register", component: RegisterComponent},
  {path: "promena_lozinke", component: PromenaLozinkeComponent},
  {path: "lekar_gost", component: LekarGostComponent},
  {path: "menadzer", component: MenadzerComponent},
  {path: "izvestaj_printable", component: IzvestajPrintableComponent},
  {path: "izvestaj_printable_all", component: IzvestajPrintableAllComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
