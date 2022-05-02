import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'mongoose';

import { Bootstrap } from '../../bootstrap/bootstrap';
import { AppModule } from '../../app/app.module';
import { MongoDbService } from '../../infra/database/mongo-db/mongo-db.service';

describe('[E2E] PokemonModule', () => {
  let app: INestApplication;
  let connection: Connection;
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
    connection = moduleRef.get<MongoDbService>(MongoDbService).getConnection();
  });

  beforeAll(async () => {
    await connection.collection('mongodbpokemon').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  describe('When a pokemon is requested', () => {
    let response: request.Response;
    beforeAll(async () => {
      response = await request(httpServer).post('/api/pokemon');
    });

    test('Then it should return a 200 response status', async () => {
      expect(response.status).toBe(200);
    });

    test('And a single pokemon should be included in the response', async () => {
      const pokemon = await connection
        .collection('mongodbpokemon')
        .find()
        .toArray();
      expect(pokemon.length).toEqual(1);
    });
  });
});
