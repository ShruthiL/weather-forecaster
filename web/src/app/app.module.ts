import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AngularFireLite} from 'angularfire-lite';
import {FormsModule} from "@angular/forms";
import {NguiAutoCompleteModule} from '@ngui/auto-complete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/ui/error/error.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HeaderComponent } from './pages/ui/header/header.component';
import { WeatherCardComponent } from './pages/ui/weather-card/weather-card.component';
import { AddCardComponent } from './pages/ui/add-card/add-card.component';
import { AddComponent } from './pages/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    SignupComponent,
    HeaderComponent,
    WeatherCardComponent,
    AddCardComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireLite.forRoot(environment.config),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    NguiAutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
