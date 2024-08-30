// src/player/player.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  async findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { // id é recebido como string
    const numericId = parseInt(id, 10); // Converte o id para número
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.playerService.findOne(numericId);
  }
}
