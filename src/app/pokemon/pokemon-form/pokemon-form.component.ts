import { Component, Input, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;

  types: string[];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
  }

  hasType(type: string): boolean {
    // si le pokémon a, dans ces types, le type passé en paramètre. includes renvoie true ou false
    return this.pokemon.types.includes(type);
  }

  // $event va nous dire si l'utilisateur a coché ou non, type va nous dire ce qu'il a coché
  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    // si c'est coché
    if (isChecked) {
      this.pokemon.types.push(type);
    }
    // si non
    else {
      // recup l'index du type que l'utilisateur veut retirer
      const index = this.pokemon.types.indexOf(type);

      // modifer le tableau ici, gräce a splice puis retirer l'élément
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    // s'il coche 1 seul case, on l'empêche de la décocher
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }

    // s'il a déjà coché 3 cases, on l'empêche d'en cocher 1 autre mais on l'empêche pas d'en décocher 1 puis d'en cocher une 3e
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    this.pokemonService.updatePokemon(this.pokemon)
      .subscribe(() => this.router.navigate(["/pokemon", this.pokemon.id]));
  }

}
