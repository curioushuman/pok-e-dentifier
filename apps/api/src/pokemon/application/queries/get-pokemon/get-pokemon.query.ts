import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';
import { pipe } from 'fp-ts/lib/function';
import { map, tryCatch } from 'fp-ts/lib/TaskEither';

import { PokemonRepository } from '../../../adapter/ports/pokemon.repository';
import { executeTask } from '../../../../shared/utils/execute-task';
import { GetPokemonQueryDto } from './get-pokemon.query.dto';
import { PokemonResponseDto } from '../../dto/pokemon.response.dto';
import { GetPokemonMapper } from './get-pokemon.mapper';
import { Pokemon } from '../../../domain/entities/pokemon';

export class GetPokemonQuery implements IQuery {
  constructor(public readonly getPokemonQueryDto: GetPokemonQueryDto) {}
}

@QueryHandler(GetPokemonQuery)
export class GetPokemonHandler implements IQueryHandler {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(query: GetPokemonQuery): Promise<PokemonResponseDto> {
    const { getPokemonQueryDto } = query;
    // TODO: it is here you _might_ interpret different
    // inputs in the query DTO e.g. slug vs id
    const { slug } = getPokemonQueryDto;
    const findOne = pipe(
      tryCatch(
        async () => {
          return await this.pokemonRepository.findOne(slug);
        },
        (reason: unknown) => reason as Error
      ),
      map((pokemon: Pokemon) => GetPokemonMapper.toResponseDto(pokemon))
    );
    return executeTask(findOne);
  }
}
