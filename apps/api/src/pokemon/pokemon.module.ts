import { Module } from '@nestjs/common';

import { LoggableModule } from '@curioushuman/loggable';

import { PokemonController } from './infra/pokemon.controller';

@Module({
  imports: [LoggableModule],
  controllers: [PokemonController],
  exports: [],
})
export class PokemonModule {}
