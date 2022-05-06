import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { chain, right, tryCatch } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';

import { LoggableLogger } from '@curioushuman/loggable';

import { GetPokemonQuery } from '../application/queries/get-pokemon/get-pokemon.query';
import { executeTask } from '../../shared/utils/execute-task';
import { GetPokemonRequestDto } from '../infra/dto/get-pokemon.request.dto';
import type { GetPokemonRequestDtoKeys } from '../infra/dto/get-pokemon.request.dto';
import { GetPokemonMapper } from '../application/queries/get-pokemon/get-pokemon.mapper';
import { PokemonResponseDto } from '../infra/dto/pokemon.response.dto';
import { ValidationError } from 'runtypes';
import { Pokemon } from '../domain/entities/pokemon';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private logger: LoggableLogger,
    private readonly queryBus: QueryBus
  ) {
    this.logger.setContext('PokemonController');
  }

  /**
   * TODO: Refactor to make simpler
   * - could use the serialize decorator approach
   */
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
      (error: Error) => {
        if (error instanceof ValidationError) {
          return new BadRequestException(error.toString());
        }
        return error;
      }
    );
    const mapToResponseDto = chain<Error, Pokemon, PokemonResponseDto>(
      (pokemon) => right(GetPokemonMapper.toResponseDto(pokemon))
    );
    const task = pipe(getOneQuery, mapToResponseDto);
    return executeTask(task);
  }
}
