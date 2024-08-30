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
    const numericId = parseInt(id as unknown as string, 10); // Converte o id para número
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.prisma.team.findUnique({
      where: { id: numericId },
      include: { players: true },
    });
  }
}
