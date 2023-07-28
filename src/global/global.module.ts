import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config, { Config } from 'src/env/config';
import { ConfigModule, ConfigType } from '@nestjs/config';

/*
TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<Config>) => {
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: name,
          synchronize: true,
        };
      },
      inject: [config.KEY],
    }),
*/

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<Config>) => {
        const { host, port, username, password, name } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: name,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [TypeOrmModule],
})
export class GlobalModule {}
