// src/team/team.controller.ts

import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

// Routes para times
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
  async findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.teamService.findOne(numericId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: CreateTeamDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.teamService.update(numericId, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.teamService.remove(numericId);
  }
}
