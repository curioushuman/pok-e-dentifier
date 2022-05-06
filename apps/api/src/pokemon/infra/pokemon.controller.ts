import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { tryCatch } from 'fp-ts/lib/TaskEither';

import { LoggableLogger } from '@curioushuman/loggable';

import { GetPokemonQuery } from '../application/queries/get-pokemon/get-pokemon.query';
import { executeTask } from '../../shared/utils/execute-task';
import { GetPokemonRequestDto } from '../application/queries/get-pokemon/get-pokemon.request.dto';
import type { GetPokemonRequestDtoKeys } from '../application/queries/get-pokemon/get-pokemon.request.dto';
import { GetPokemonMapper } from '../application/queries/get-pokemon/get-pokemon.mapper';
import { PokemonResponseDto } from '../application/dto/pokemon.response.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private logger: LoggableLogger,
    private readonly queryBus: QueryBus
  ) {
    this.logger.setContext('PokemonController');
  }

  @Get(':slug')
  async getOne(
    @Param() params: Record<GetPokemonRequestDtoKeys, string>
  ): Promise<PokemonResponseDto> {
    const getOneQuery = tryCatch(
      async () => {
        // TODO: convert this first check into a decorator
        const getPokemonRequestDto = GetPokemonRequestDto.check(params);
        const getPokemonQueryDto =
          GetPokemonMapper.toQueryDto(getPokemonRequestDto);
        const query = new GetPokemonQuery(getPokemonQueryDto);
        return await this.queryBus.execute<GetPokemonQuery>(query);
      },
      (reason: unknown) => reason as Error
    );

    return await executeTask(getOneQuery);
  }
}
