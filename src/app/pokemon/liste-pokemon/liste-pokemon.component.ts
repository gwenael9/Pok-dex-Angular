import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-liste-pokemon",
  templateUrl: "./liste-pokemon.component.html",
  styleUrls: ["./liste-pokemon.component.css"],
})

export class ListePokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  // pour accèder aux détails de chaque pokémon
  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
