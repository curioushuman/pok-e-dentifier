import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { tryCatch } from 'fp-ts/lib/TaskEither';

import { LoggableLogger } from '@curioushuman/loggable';

import { GetPokemonQuery } from '../application/queries/get-pokemon.query';
import type { Slug } from '../domain/value-objects/slug';
import { Pokemon } from '../domain/entities/pokemon';
import { executeTask } from '../../shared/utils/execute-task';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private logger: LoggableLogger,
    private readonly queryBus: QueryBus
  ) {
    this.logger.setContext('PokemonController');
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: Slug): Promise<Pokemon> {
    const getOneQuery = tryCatch(
      async () => {
        const query = new GetPokemonQuery(slug);
        return await this.queryBus.execute<GetPokemonQuery>(query);
      },
      (reason: unknown) => reason as Error
    );

    return await executeTask(getOneQuery);
  }
}
