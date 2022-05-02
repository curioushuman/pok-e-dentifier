import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

import type { Name } from '../../../domain/value-objects/name';
import { Pokemon } from '../../../domain/entities/pokemon';
import type { Slug } from '../../../domain/value-objects/slug';
import { PokemonRepository } from '../../ports/pokemon.repository';

@Injectable()
export class FakePokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  constructor() {
    const pikachuName = 'pikachu' as Name;
    const pikachuSlug = 'pikachu' as Slug;
    this.pokemons.push({
      name: pikachuName,
      slug: pikachuSlug,
    });
  }

  findOne = (slug: Slug): TaskEither<Error, Pokemon> => {
    return tryCatch(
      async () => {
        return this.pokemons.length ? this.pokemons[0] : null;
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
