import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientComponent } from './components/client/client.component';
import { UserComponent } from './components/user/user.component';
import { ClaimComponent } from './components/claim/claim.component';
import { TypeclaimComponent } from './components/typeclaim/typeclaim.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from "primeng/button";
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ClientComponent,
    UserComponent,
    ClaimComponent,
    TypeclaimComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    MenubarModule,
    DialogModule,
    ToastModule

  ],
  providers: [MessageService],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
