import { PrismaService } from '../../prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from '@prisma/client';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: number): Promise<Player | null>;
    update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player>;
    remove(id: number): Promise<Player | null>;
}
