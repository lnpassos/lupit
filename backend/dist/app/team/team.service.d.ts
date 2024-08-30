import { PrismaService } from '../../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from '@prisma/client';
export declare class TeamService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    findAll(): Promise<Team[]>;
    findOne(id: number): Promise<Team>;
    update(id: number, updateTeamDto: CreateTeamDto): Promise<Team>;
    remove(id: number): Promise<void>;
}
