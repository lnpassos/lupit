// src/player/dto/create-player.dto.ts

import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;

  @IsInt()
  teamId: number;  // Deve ser um número
}
