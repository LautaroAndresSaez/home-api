import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { HomesModule } from './homes/homes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GlobalModule, HomesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
