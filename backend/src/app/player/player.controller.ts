import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

// Routes para jogadores
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
  async findOne(@Param('id') id: string) { 
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.playerService.findOne(numericId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.playerService.update(numericId, updatePlayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    return this.playerService.remove(numericId);
  }
}
