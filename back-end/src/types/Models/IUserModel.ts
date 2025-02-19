import { IUserLoginModel } from "./IUserLoginModel";
import { ICallingModel } from "./ICallingModel";

export interface IUserModelDTO {
    id?: number;
    name: string;
    department: IDepartment;
    enterprise: IEnterprise;
    role: IRole;
    calling?: ICallingModel;
    login?: IUserLoginModel;
    created_at?: Date;
    updated_at?: Date;
}

export enum IDepartment {
    SECRETARIA = "SECRETARIA",
    VENDAS = "VENDAS",
    DOCUMENTOS = "DOCUMENTOS",
    JURIDICO = "JURIDICO",
    PARCEIROS = "PARCEIROS",
    MARKETING = "MARKETING",
    TI = "TI",
    FINANCEIRO = "FINANCEIRO",
    POSVENDAS = "POSVENDAS",
}

export enum IEnterprise {
    FACULESTE = "FACULESTE",
    EDUCAMINAS = "EDUCAMINAS",
    FACUVALE = "FACUVALE"
}

export enum IRole {
    COSTUMER = "COSTUMER",
    ADMIN = "ADMIN",
}