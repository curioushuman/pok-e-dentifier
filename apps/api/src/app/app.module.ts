import { Module } from '@nestjs/common';

import { PingModule } from '@curioushuman/ping';
import { LoggableModule } from '@curioushuman/loggable';

import { MongoDbModule } from '../infra/database/mongo-db/mongo-db.module';
import { IdentityAndAccessModule } from '../identity-and-access/identity-and-access.module';

@Module({
  imports: [IdentityAndAccessModule, LoggableModule, MongoDbModule, PingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
