import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Bootstrap } from '../../bootstrap/bootstrap';
import { AppModule } from '../../app/app.module';
import { PokemonBuilder } from './data-builders/pokemon.builder';
import { Pokemon } from '../domain/entities/pokemon';

jest.setTimeout(5000);

describe('[E2E] PokemonModule', () => {
  let app: INestApplication;
  // disabling no-explicit-any for testing purposes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let httpServer: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    Bootstrap.useGlobalSettings(app);
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('When a pokemon is requested', () => {
    let response: request.Response;
    let pokemon: Pokemon;

    beforeAll(async () => {
      pokemon = PokemonBuilder().withDash().build();
      response = await request(httpServer).get(`/api/pokemon/${pokemon.slug}`);
    });
    test('Then it should return a 200 response status', () => {
      expect(response.status).toBe(200);
    });

    test('And the correct Pokemon', () => {
      expect(response.body.name).toEqual(pokemon.slug);
    });
  });
});
