import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

import { Pokemon } from '../../../domain/entities/pokemon';
import type { Slug } from '../../../domain/value-objects/slug';
import { PokemonRepository } from '../../ports/pokemon.repository';

@Injectable()
export class PokeApiPokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  constructor(private httpService: HttpService) {}

  findOne = (slug: Slug): TaskEither<Error, Pokemon> => {
    return tryCatch(
      async () => {
        const pokemonRequest$ = this.httpService.get(
          `https://pokeapi.co/api/v2/pokemon/${slug}`
        );

        // let pokemon: Pokemon;
        const response = await firstValueFrom(pokemonRequest$);

        return response.data;
      },
      (reason: unknown) => new InternalServerErrorException(reason)
    );
  };

  all = (): TaskEither<Error, Pokemon[]> => {
    return tryCatch(
      async () => {
        return this.pokemons;
      },
      (reason: unknown) => new InternalServerErrorException(reason)
    );
  };
}
