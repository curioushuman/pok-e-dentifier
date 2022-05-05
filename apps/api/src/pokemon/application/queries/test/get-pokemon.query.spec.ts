import { Test, TestingModule } from '@nestjs/testing';

import { GetPokemonQuery, GetPokemonHandler } from '../get-pokemon.query';
import { PokemonRepository } from '../../../adapter/ports/pokemon.repository';
import { FakePokemonRepository } from '../../../adapter/implementations/fake/fake.pokemon.repository';
import { executeTask } from '../../../../shared/utils/execute-task';
import { PokemonBuilder } from '../../../test/data-builders/pokemon.builder';

let repository: FakePokemonRepository;

describe('[Unit] Get Pokemon Query', () => {
  let handler: GetPokemonHandler;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetPokemonHandler,
        { provide: PokemonRepository, useClass: FakePokemonRepository },
      ],
    }).compile();

    repository = moduleRef.get<PokemonRepository>(
      PokemonRepository
    ) as FakePokemonRepository;
    handler = moduleRef.get<GetPokemonHandler>(GetPokemonHandler);
  });

  describe('When ALL input is valid', () => {
    test('then it should return a pokemon', async () => {
      const pokemon = PokemonBuilder().withDash().build();
      const result = await handler.execute(new GetPokemonQuery(pokemon.slug));

      expect(result).toStrictEqual(pokemon);
    });
  });
});
