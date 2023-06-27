import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})

export class SearchPokemonComponent implements OnInit {

  // Subject stock les recherches succesives, dans le moteur de recherche, dans un tableau
  // flux de données -> {..."a"..."ab"..."abo"....}
  searchTerms = new Subject<string>();
  pokemons$ : Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"...."abc".....}
      debounceTime(300),
      // {....."ab"...."ab"...."abc"}
      distinctUntilChanged(),
      // {..."ab".."ab"..."abc".....}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {......pokemonList(ab).....pokemonList(abc)....}
    )
  }

  search(term: string) {

    // next est comme push, il va pousser les lettres tapés par l'utilisateur dans un tableau
    this.searchTerms.next(term);
  }

  // quand on choisi un pokémon avec la recherche
  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link)
  }
}
