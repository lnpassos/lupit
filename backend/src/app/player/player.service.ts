// src/player/player.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    // Certifique-se de que teamId é um número
    const { name, age, teamId } = createPlayerDto;
    return this.prisma.player.create({
      data: {
        name,
        age,
        teamId: parseInt(teamId.toString(), 10),  // Converte para número
      },
    });
  }

  async findAll(): Promise<Player[]> {
    return this.prisma.player.findMany({
      include: {
        team: true,  // Inclui o time associado ao jogador
      },
    });
  }

  async findOne(id: number): Promise<Player | null> {
    return this.prisma.player.findUnique({
      where: { id },
      include: {
        team: true,  // Inclui o time associado ao jogador
      },
    });
  }
}
