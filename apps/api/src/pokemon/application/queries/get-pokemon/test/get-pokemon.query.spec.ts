import { Test, TestingModule } from '@nestjs/testing';

import { GetPokemonQuery, GetPokemonHandler } from '../get-pokemon.query';
import { PokemonRepository } from '../../../../adapter/ports/pokemon.repository';
import { FakePokemonRepository } from '../../../../adapter/implementations/fake/fake.pokemon.repository';
import { PokemonBuilder } from '../../../../test/data-builders/pokemon.builder';

describe('[Unit] Get Pokemon Query', () => {
  let handler: GetPokemonHandler;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetPokemonHandler,
        { provide: PokemonRepository, useClass: FakePokemonRepository },
      ],
    }).compile();

    handler = moduleRef.get<GetPokemonHandler>(GetPokemonHandler);
  });

  describe('When ALL input is valid', () => {
    test('Then it should return a pokemon', async () => {
      const pokemon = PokemonBuilder().withDash().build();
      const getPokemonQueryDto = {
        slug: pokemon.slug,
      };

      const result = await handler.execute(
        new GetPokemonQuery(getPokemonQueryDto)
      );

      expect(result).toStrictEqual(pokemon);
    });
  });
});
