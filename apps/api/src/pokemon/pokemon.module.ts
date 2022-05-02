import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LoggableModule } from '@curioushuman/loggable';

import { PokemonController } from './infra/pokemon.controller';
import { GetPokemonHandler } from './application/queries/get-pokemon.query';

// const commandHandlers = [];
const queryHandlers = [GetPokemonHandler];

@Module({
  imports: [CqrsModule, LoggableModule],
  controllers: [PokemonController],
  providers: [...queryHandlers],
  exports: [],
})
export class PokemonModule {}
