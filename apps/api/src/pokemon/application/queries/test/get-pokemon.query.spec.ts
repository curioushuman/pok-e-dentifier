import { Test, TestingModule } from '@nestjs/testing';

import { GetPokemonQuery, GetPokemonHandler } from '../get-pokemon.query';

describe('[Unit] Create User Command', () => {
  let handler: GetPokemonHandler;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [GetPokemonHandler],
    }).compile();
    handler = moduleRef.get<GetPokemonHandler>(GetPokemonHandler);
  });

  describe('When ALL input is valid', () => {
    test('then it should return a pokemon', async () => {
      const result = await handler.execute(new GetPokemonQuery('jigglypuff'));

      expect(result).toBe('Pokemon: jigglypuff');
    });
  });
});
