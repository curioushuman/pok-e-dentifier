import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Bootstrap } from '../../bootstrap/bootstrap';
import { AppModule } from '../../app/app.module';
import { PokemonBuilder } from './data-builders/pokemon.builder';
import { Pokemon } from '../domain/entities/pokemon';

jest.setTimeout(10000);

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

  describe('Given a specific Pokemon is being requested', () => {
    let response: request.Response;
    let pokemon: Pokemon;

    describe('When that Pokemon exists, and the request is valid', () => {
      describe('Jigglypuff definitely exists', () => {
        beforeAll(async () => {
          pokemon = PokemonBuilder().build();
          response = await request(httpServer).get(
            `/api/pokemon/${pokemon.slug}`
          );
        });
        test('Then response status should be 200', () => {
          expect(response.status).toBe(200);
        });

        test('And the Jigglypuff is returned', () => {
          expect(response.body.name).toEqual(pokemon.slug);
        });

        test.todo('And the request/response is logged');
      });
      describe("Farfetch'd exists and normally includes apostrophe", () => {
        beforeAll(async () => {
          pokemon = PokemonBuilder().withApostrophe().build();
          response = await request(httpServer).get(
            `/api/pokemon/${pokemon.slug}`
          );
        });
        test('Then response status should be 200', () => {
          expect(response.status).toBe(200);
        });
      });
      describe('Hakamo-o exists and includes dash', () => {
        beforeAll(async () => {
          pokemon = PokemonBuilder().withDash().build();
          response = await request(httpServer).get(
            `/api/pokemon/${pokemon.slug}`
          );
        });
        test('Then response status should be 200', () => {
          expect(response.status).toBe(200);
        });
      });
    });

    // describe('When that Pokemon does not exist e.g. Furfligarbabard', () => {
    //   test.todo('Then response status should be 404 (not found)');

    //   test.todo('And the request/response is logged');
    // });

    // describe('When the request is invalid', () => {
    //   describe("Farfetch'd with the apostrophe included", () => {
    //     test.todo('Then response status should be 400 (bad request)');
    //     test.todo('And the request/response is logged');
    //   });
    //   describe('Any other punctuation', () => {
    //     test.todo('Then response status should be 400 (bad request)');
    //     test.todo('And the request/response is logged');
    //   });
    // });

    // describe('When something unforeseen goes wrong', () => {
    //   describe('When something unforeseen goes wrong', () => {
    //     test.todo('Then response status should be 500 (internal server error)');
    //     test.todo('The internal error is logged');
    //     test.todo('And the request/response is logged');
    //   });
    // });
  });
});
