import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';
import { tryCatch } from 'fp-ts/lib/TaskEither';

import type { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonRepository } from '../../../adapter/ports/pokemon.repository';
import { executeTask } from '../../../../shared/utils/execute-task';
import { GetPokemonQueryDto } from './get-pokemon.query.dto';

export class GetPokemonQuery implements IQuery {
  constructor(public readonly getPokemonQueryDto: GetPokemonQueryDto) {}
}

@QueryHandler(GetPokemonQuery)
export class GetPokemonHandler implements IQueryHandler {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(query: GetPokemonQuery): Promise<Pokemon> {
    const { getPokemonQueryDto } = query;
    // TODO: it is here you _might_ interpret different
    // inputs in the query DTO e.g. slug vs id
    const { slug } = getPokemonQueryDto;
    // UPTO: pipe this tryCatch into mapper.toResponseDto
    const findOne = tryCatch(
      async () => {
        return await this.pokemonRepository.findOne(slug);
      },
      (reason: unknown) => reason as Error
    );
    return executeTask(findOne);
  }
}
