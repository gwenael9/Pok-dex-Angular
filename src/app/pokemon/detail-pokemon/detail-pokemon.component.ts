import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styles: [
    '.card-action a:hover { cursor: pointer; }'
  ]
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  // propriété qui contient un pokémon a affiché à l'utilisateur, si il existe je l'affiche sinon je dis qu'aucun pokémon est trouvé
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    // je récupère l'id contenue dans l'url, si j'ai un id c'est une string sinon null
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");

    // si l'id est trouvé dans l'url, alors je vais attribuer, à la propriéte pokémon, le pokémon qui correspond à cet id
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => this.goBack());
  }

  // quand on click sur le bouton retour, on retourne sur la liste de pokémons
  goBack() {
    this.router.navigate(["/pokemons"]);
  }

  goEdit(pokemon: Pokemon) {
    this.router.navigate(["/edit/pokemon", pokemon.id]);
  }
}
