import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/authorization/login/login.component';
import {RegisterComponent} from './components/authorization/register/register.component';
import {HomeComponent} from './components/base/home/home.component';
import {FooterComponent} from './components/root/footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HeaderComponent} from './components/root/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ContactComponent} from './components/information/contact/contact.component';
import {AboutusComponent} from './components/information/aboutus/aboutus.component';
import {MatMenuModule} from "@angular/material/menu";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatStepperModule} from "@angular/material/stepper";
import {NgOptimizedImage} from "@angular/common";
import {CardComponent} from './components/base/card/card.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {LeftpanelComponent} from './components/base/leftpanel/leftpanel.component';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
        ContactComponent,
        AboutusComponent,
        CardComponent,
        LeftpanelComponent,
    ],
    bootstrap: [AppComponent], imports: [MatButtonModule,
        MatToolbarModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        MatCardModule,
        MatListModule,
        MatStepperModule,
        NgOptimizedImage,
        MatTooltipModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
