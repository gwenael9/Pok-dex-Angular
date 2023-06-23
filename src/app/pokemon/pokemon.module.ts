import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListePokemonComponent } from "./liste-pokemon/liste-pokemon.component";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { BorderCardDirective } from "./border-card.directive";
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { RouterModule, Routes } from "@angular/router";
import { PokemonService } from "./pokemon.service";
import { FormsModule } from "@angular/forms";
import { PokemonFormComponent } from "./pokemon-form/pokemon-form.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";

const pokemonRoutes: Routes = [
  { path: "edit/pokemon/:id", component: EditPokemonComponent },
  { path: "pokemons", component: ListePokemonComponent },
  { path: "pokemon/:id", component: DetailPokemonComponent },
];

@NgModule({
  declarations: [
    ListePokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)],
  providers: [PokemonService],
})
export class PokemonModule {}
