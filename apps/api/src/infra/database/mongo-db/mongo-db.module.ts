import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggableLogger } from '@curioushuman/loggable';

import { MongoDbService } from './mongo-db.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const logger = new LoggableLogger(
          'MongoDbModule.MongooseModule.forRootAsync'
        );
        const db = process.env.RBC_MONGODB_DATABASE;
        const u = process.env.RBC_MONGODB_USERNAME;
        const p = process.env.RBC_MONGODB_PASSWORD;
        const n = process.env.RBC_RELEASE_NAME;
        const ns = process.env.RBC_RELEASE_NAMESPACE;
        const port = process.env.RBC_API_MONGODB_SERVICE_PORT_MONGODB;
        const uri = `mongodb://${u}:${p}@${n}-mongodb.${ns}.svc.cluster.local:${port}/${db}`;
        logger.debug(`MongoDB URI: ${uri}`);
        return {
          uri,
        };
      },
    }),
  ],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {}
