import { AbstractCallingService, ICallingModelDTO, IPriority, IStatus } from "../types/Service/callingService";
import { prisma } from "../config/dbConfig";

export class CallingService extends AbstractCallingService {

    private readonly db = prisma;

    constructor () {
        super();
    }

    protected async getAllCallings ( skip: number = 1, take: number = 10 ): Promise<ICallingModelDTO[]> {
        try {
            return await this.db.calling.findMany({
                skip: skip,
                take: take,
                select: {
                    user: false,
                    id: false
                }
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    protected async getCallingById ( id: string ): Promise<ICallingModelDTO> {
        try {
            return await this.db.calling.findFirst({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    protected async createCalling ( userId: number, data: ICallingModelDTO ): Promise<ICallingModelDTO> {
        if (!data.title || !data.description || !data.type || !data.priority) {
            throw new Error("Data is missing")
        }
        try {
            await this.db.calling.create({
                data: {
                    title: data.title,
                    type: data.type,
                    description: data.description,
                    status: data.status ? data.status : IStatus.PENDENTE,
                    priority: data.priority ? data.priority : IPriority.BAIXA,
                    date: new Date().getDate(),
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                },
            })

            return await this.db.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    data: {
                        Login: false
                    }
                }
            })
        } catch (err) {
            console.error(err)
            throw err;
        }
    }

    protected async updateCalling ( id: string, data: ICallingModelDTO ): Promise<ICallingModelDTO> {
        try {
            const teamIT = await this.db.user.findMany({
                where: {
                    department: "TI"
                }
            });

            return await this.db.calling.update({
                where: { id },
                data: {
                    title: data.title,
                    description: data.description,
                    type: data.type,
                    ...(teamIT && { status: data.status }) // Verifica se o usuario é da equipe de TI
                }
            });
        } catch (err) {
            console.error("Erro ao atualizar chamado:", err);
            throw err;
        }
    }

    protected async deleteCalling ( id: string ): Promise<void> {
        try {
            await this.db.calling.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}