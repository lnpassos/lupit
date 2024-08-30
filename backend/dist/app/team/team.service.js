"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let TeamService = class TeamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTeamDto) {
        return this.prisma.team.create({
            data: createTeamDto,
        });
    }
    async findAll() {
        return this.prisma.team.findMany();
    }
    async findOne(id) {
        return this.prisma.team.findUnique({
            where: { id },
            include: { players: true },
        });
    }
    async update(id, updateTeamDto) {
        try {
            const existingTeam = await this.prisma.team.findUnique({
                where: { id },
            });
            if (!existingTeam) {
                throw new Error('Time não encontrado');
            }
            return this.prisma.team.update({
                where: { id },
                data: Object.assign(Object.assign({}, updateTeamDto), { updatedDt: new Date() }),
            });
        }
        catch (error) {
            console.error(`Error updating team with ID ${id}:`, error);
            throw new Error(`Unable to update team with ID ${id}`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.player.deleteMany({
                where: { teamId: id },
            });
            await this.prisma.team.delete({
                where: { id },
            });
        }
        catch (error) {
            console.error(`Error removing team with ID ${id}:`, error);
            throw new Error(`Unable to remove team with ID ${id}`);
        }
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamService);
//# sourceMappingURL=team.service.js.map