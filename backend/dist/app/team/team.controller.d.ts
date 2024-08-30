import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(createTeamDto: CreateTeamDto): Promise<{
        id: number;
        name: string;
        createdDt: Date;
        updatedDt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        createdDt: Date;
        updatedDt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        createdDt: Date;
        updatedDt: Date;
    }>;
    update(id: string, updateTeamDto: CreateTeamDto): Promise<{
        id: number;
        name: string;
        createdDt: Date;
        updatedDt: Date;
    }>;
    remove(id: string): Promise<void>;
}
