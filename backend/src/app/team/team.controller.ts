// src/team/team.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { // id é recebido como string
    const numericId = parseInt(id, 10); // Converte o id para número
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.teamService.findOne(numericId);
  }
}
