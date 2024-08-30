import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [TeamModule, PlayerModule],
  providers: [PrismaService],
})
export class AppModule {}
