import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { AddParfumComponent } from './add-parfum/add-parfum.component';
import { UpdateParfumComponent } from './update-parfum/update-parfum.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { UpdateMarqueComponent } from './update-marque/update-marque.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './services/token.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    ParfumsComponent,
    AddParfumComponent,
    UpdateParfumComponent,
    RechercheParMarqueComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeMarquesComponent,
    UpdateMarqueComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
