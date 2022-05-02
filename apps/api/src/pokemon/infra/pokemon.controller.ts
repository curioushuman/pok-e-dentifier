import { Controller, HttpCode, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { LoggableLogger } from '@curioushuman/loggable';

import { GetPokemonQuery } from '../application/queries/get-pokemon.query';
import { Slug } from '../domain/value-objects/slug';
import { Pokemon } from '../domain/entities/pokemon';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private logger: LoggableLogger,
    private readonly queryBus: QueryBus
  ) {
    this.logger.setContext('PokemonController');
  }

  @Get(':slug')
  @HttpCode(200)
  async getOne(@Param() slug: Slug): Promise<Pokemon> {
    return this.queryBus.execute(new GetPokemonQuery(slug));
  }
}
