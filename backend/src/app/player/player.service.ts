// src/player/player.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.prisma.player.create({
      data: createPlayerDto,
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
    const numericId = parseInt(id as unknown as string, 10); // Converte o id para número
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.prisma.player.findUnique({
      where: { id: numericId },
      include: {
        team: true,  // Inclui o time associado ao jogador
      },
    });
  }
}
