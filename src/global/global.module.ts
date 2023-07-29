import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config, { Config } from 'src/env/config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
    JwtModule.registerAsync({
      global: true,
      inject: [config.KEY],
      useFactory(configService: ConfigType<Config>) {
        return {
          secret: configService.secret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class GlobalModule {}
