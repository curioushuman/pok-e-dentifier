import { Module } from '@nestjs/common';

import { LoggableModule } from '@curioushuman/loggable';

import { PokemonController } from './infra/Pokemon.controller';

@Module({
  imports: [LoggableModule],
  controllers: [PokemonController],
  exports: [],
})
export class PokemonModule {}
