import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

import { Pokemon } from '../../../domain/entities/pokemon';
import type { Slug } from '../../../domain/value-objects/slug';
import { PokemonRepository } from '../../ports/pokemon.repository';
import { PokeApiPokemonDto } from './poke-api.pokemon.dto';
import { PokeApiPokemonMapper } from './poke-api.pokemon.mapper';

@Injectable()
export class PokeApiPokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  constructor(private httpService: HttpService) {}

  public async findOne(slug: Slug): Promise<Pokemon> {
    const pokemonRequest$ = this.httpService.get(
      `https://pokeapi.co/api/v2/pokemon/${slug}`
    );

    const response = await firstValueFrom(pokemonRequest$);
    if (response.status !== 200) {
      // TODO: grab error message from response
      // TODO: log error
      throw new InternalServerErrorException('balls');
    }

    const pokeApiPokemonDto = PokeApiPokemonDto.check(response.data);
    return PokeApiPokemonMapper.toDomain(pokeApiPokemonDto);
  }

  all = (): TaskEither<Error, Pokemon[]> => {
    return tryCatch(
      async () => {
        return this.pokemons;
      },
      (reason: unknown) => new InternalServerErrorException(reason)
    );
  };
}
