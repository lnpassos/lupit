import { PrismaService } from '../../prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from '@prisma/client';
export declare class PlayerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: number): Promise<Player | null>;
}
