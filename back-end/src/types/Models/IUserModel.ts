import { IUserLoginModel } from "./IUserLoginModel";
import { ICallingModel } from "./ICallingModel";

export interface IUserModel {
    id?: number;
    name: string;
    department: Department;
    enterprise: Enterprise;
    role: string;
    calling?: ICallingModel;
    login?: IUserLoginModel;
    created_at?: Date;
    updated_at?: Date;
}

export enum Department {
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

export enum Enterprise {
    FACULESTE = "FACULESTE",
    EDUCAMINAS = "EDUCAMINAS",
    FACUVALE = "FACUVALE"
}