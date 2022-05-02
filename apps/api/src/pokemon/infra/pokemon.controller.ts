import { Controller, HttpCode, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { LoggableLogger } from '@curioushuman/loggable';

import { GetPokemonQuery } from '../application/queries/get-pokemon.query';
import { Slug } from '../domain/value-objects/slug';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private logger: LoggableLogger,
    private readonly queryBus: QueryBus
  ) {
    this.logger.setContext('PokemonController');
  }

  @Get()
  @HttpCode(200)
  async getPokemon(): Promise<string> {
    const slug = 'pikachu' as Slug;
    return this.queryBus.execute(new GetPokemonQuery(slug));
  }
}
