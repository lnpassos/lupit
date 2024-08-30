// src/player/player.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from '@prisma/client';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { name, age, teamId } = createPlayerDto;
    return this.prisma.player.create({
      data: {
        name,
        age,
        teamId: parseInt(teamId.toString(), 10),
      },
    });
  }

  async findAll(): Promise<Player[]> {
    return this.prisma.player.findMany({
      include: {
        team: true,
      },
    });
  }

  async findOne(id: number): Promise<Player | null> {
    return this.prisma.player.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  async remove(id: number): Promise<Player | null> {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
