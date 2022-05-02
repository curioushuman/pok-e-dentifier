import { Controller, HttpCode, Get } from '@nestjs/common';

import { LoggableLogger } from '@curioushuman/loggable';

@Controller('pokemon')
export class PokemonController {
  constructor(private logger: LoggableLogger) {
    this.logger.setContext('PokemonController');
  }

  @Get()
  @HttpCode(200)
  async getPokemon(): Promise<string> {
    return 'Pokemon';
  }
}
