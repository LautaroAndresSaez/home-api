import { Module } from '@nestjs/common';
import { HomesService } from './services/homes.service';

@Module({
  providers: [HomesService]
})
export class HomesModule {}
