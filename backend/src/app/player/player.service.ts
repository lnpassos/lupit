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

    // Cria o jogador
    const player = await this.prisma.player.create({
      data: {
        name,
        age,
        teamId: parseInt(teamId.toString(), 10),
      },
    });

    // Atualiza o campo updatedDt do time
    await this.prisma.team.update({
      where: { id: player.teamId },
      data: {
        updatedDt: new Date(), // Atualiza para a data e hora atuais
      },
    });

    return player;
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
    const updatedPlayer = await this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });

    if (updatePlayerDto.teamId) {
      // Atualiza o campo updatedDt do novo time, caso o teamId tenha sido alterado
      await this.prisma.team.update({
        where: { id: updatePlayerDto.teamId },
        data: {
          updatedDt: new Date(),
        },
      });
    }

    return updatedPlayer;
  }

  async remove(id: number): Promise<Player | null> {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
