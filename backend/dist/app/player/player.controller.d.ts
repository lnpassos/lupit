import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    create(createPlayerDto: CreatePlayerDto): Promise<{
        id: number;
        name: string;
        age: number;
        teamId: number;
        createdDt: Date;
        updatedDt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        age: number;
        teamId: number;
        createdDt: Date;
        updatedDt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        age: number;
        teamId: number;
        createdDt: Date;
        updatedDt: Date;
    }>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<{
        id: number;
        name: string;
        age: number;
        teamId: number;
        createdDt: Date;
        updatedDt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        age: number;
        teamId: number;
        createdDt: Date;
        updatedDt: Date;
    }>;
}
