import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { IntroComponent } from './intro/intro.component';
import { AppRoutingModule } from './app-routing.module';
//servicios
import { ClientsService } from './services/clients.service';

import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ClientsService],
  bootstrap: [IntroComponent]
})
export class AppModule { }
