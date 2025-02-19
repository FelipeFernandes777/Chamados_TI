export abstract class AbstractCallingService {
    protected abstract getAllCallings ( skip: number, take: number ): Promise<ICallingModelDTO[]>

    protected abstract getCallingById ( id: string ): Promise<ICallingModelDTO>

    protected abstract createCalling ( userId: number, data: ICallingModelDTO ): Promise<ICallingModelDTO>

    protected abstract updateCalling ( id: string, data: ICallingModelDTO ): Promise<ICallingModelDTO>

    protected abstract deleteCalling ( id: string ): Promise<void>
}

export interface ICallingModelDTO {
    title: string,
    status: IStatus,
    priority: IPriority,
    date: Date,
    description: string,
    type: string,
}

export enum IStatus {
    PENDENTE = "Pendente",
    ANDAMENTO = "Andamento",
    AGUARDANDO_RETORNO = "Aguardando Retorno",
    CONCLUIDO = "Concluido",
}

export enum IPriority {
    BAIXA = "Baixa",
    MEDIA = "Media",
    ALTA = "Alta",
    URGENTE = "Urgente",
}
