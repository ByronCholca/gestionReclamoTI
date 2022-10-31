import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimComponent } from './core/components/claim/claim.component';
import { ClientComponent } from './core/components/client/client.component';
import { HomeComponent } from './core/components/home/home.component';
import { TypeclaimComponent } from './core/components/typeclaim/typeclaim.component';
import { UserComponent } from './core/components/user/user.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cliente', component: ClientComponent },
  { path: 'reclamo', component: ClaimComponent },
  { path: 'usuario', component: UserComponent},
  { path: 'tipoReclamo', component: TypeclaimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }