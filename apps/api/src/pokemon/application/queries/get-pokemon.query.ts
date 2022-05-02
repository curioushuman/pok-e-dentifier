import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';

import type { Pokemon } from '../../domain/entities/pokemon';
import { PokemonRepository } from '../../adapter/ports/pokemon.repository';
import { executeTask } from '../../../utils/execute-task';
import { Slug } from '../../domain/value-objects/slug';

export class GetPokemonQuery implements IQuery {
  constructor(public readonly slug: Slug) {}
}

@QueryHandler(GetPokemonQuery)
export class GetPokemonHandler implements IQueryHandler {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(query: GetPokemonQuery): Promise<Pokemon> {
    const { slug } = query;
    return await executeTask(this.pokemonRepository.findOne(slug));
  }
}
