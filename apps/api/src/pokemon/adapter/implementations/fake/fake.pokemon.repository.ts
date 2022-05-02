import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

import { Pokemon } from '../../../domain/entities/pokemon';
import type { Slug } from '../../../domain/value-objects/slug';
import { PokemonRepository } from '../../ports/pokemon.repository';
import { PokemonBuilder } from '../../../test/data-builders/pokemon.builder';

@Injectable()
export class FakePokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  constructor() {
    this.pokemons.push(PokemonBuilder().build());
    this.pokemons.push(PokemonBuilder().withDash().build());
    this.pokemons.push(PokemonBuilder().withPunctuation().build());
  }

  findOne = (slug: Slug): TaskEither<Error, Pokemon> => {
    return tryCatch(
      async () => {
        return this.pokemons.find((pokemon) => pokemon.slug === slug);
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
