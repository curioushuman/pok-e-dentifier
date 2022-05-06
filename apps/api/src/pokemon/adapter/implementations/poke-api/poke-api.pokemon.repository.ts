import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonRepository } from '../../ports/pokemon.repository';
import {
  PokeApiPokemonDto,
  PokeApiPokemonErrorDto,
} from './poke-api.pokemon.dto';
import { PokeApiPokemonMapper } from './poke-api.pokemon.mapper';

@Injectable()
export class PokeApiPokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  constructor(private httpService: HttpService) {}

  /**
   * @param slug As string; as all specific validation already handled
   */
  public findOne(slug: string): TaskEither<Error, Pokemon> {
    const pokemonRequest$ = this.httpService.get<PokeApiPokemonDto>(
      `https://pokeapi.co/api/v2/pokemon/${slug}`
    );
    return tryCatch(
      async () => {
        const response = await firstValueFrom(pokemonRequest$);
        const pokeApiPokemonDto = PokeApiPokemonDto.check(response.data);
        return PokeApiPokemonMapper.toDomain(pokeApiPokemonDto);
      },
      (error: PokeApiPokemonErrorDto) => {
        const { status, statusText } = error.response;
        if (status === 404) {
          return new NotFoundException(
            `${slug} could not be found via PokeApi`
          );
        }
        return new InternalServerErrorException(
          `Error (${status} - ${statusText}) occurred for findOne(${slug}) at PokeApi`
        );
      }
    );
  }
}
