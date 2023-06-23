import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PokemonModule } from "./pokemon/pokemon.module";
import { FormsModule } from "@angular/forms";
import { HttpClientInMemoryWebApiModule,  } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false}),
    PokemonModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
