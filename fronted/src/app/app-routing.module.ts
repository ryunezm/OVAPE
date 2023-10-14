import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/authorization/login/login.component";
import { RegisterComponent } from "./components/authorization/register/register.component";
import { HomeComponent } from "./components/base/home/home.component";
import { AboutusComponent } from "./components/base/aboutus/aboutus.component";
import { ContactComponent } from "./components/base/contact/contact.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: '', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
