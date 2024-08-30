// src/team/team.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    return this.prisma.team.create({
      data: createTeamDto,
    });
  }

  async findAll(): Promise<Team[]> {
    return this.prisma.team.findMany();
  }

  async findOne(id: number): Promise<Team> {
    return this.prisma.team.findUnique({
      where: { id },
      include: { players: true }, // Inclui os jogadores associados ao time
    });
  }

  async update(id: number, updateTeamDto: CreateTeamDto): Promise<Team> {
    try {
      // Verifica se o time existe antes de atualizar
      const existingTeam = await this.prisma.team.findUnique({
        where: { id },
      });
      if (!existingTeam) {
        throw new Error('Time não encontrado');
      }

      // Atualiza o time com os dados fornecidos
      return this.prisma.team.update({
        where: { id },
        data: {
          ...updateTeamDto,
          updatedDt: new Date(), // Atualiza o campo de data
        },
      });
    } catch (error) {
      console.error(`Error updating team with ID ${id}:`, error);
      throw new Error(`Unable to update team with ID ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Primeiro, exclua todos os jogadores associados ao time
      await this.prisma.player.deleteMany({
        where: { teamId: id },
      });

      // Então, exclua o time
      await this.prisma.team.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error removing team with ID ${id}:`, error);
      throw new Error(`Unable to remove team with ID ${id}`);
    }
  }
}
