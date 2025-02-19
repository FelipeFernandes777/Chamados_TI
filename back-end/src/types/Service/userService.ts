import { IUserModelDTO } from "../Models/IUserModel";

export abstract class AbstractUserService {
    protected abstract getAllUsers ( skip: number, take: number ): Promise<IUserModelDTO[]>

    protected abstract getUserByIdOrNameOrDepartment ( data: getUserOptions ): Promise<IUserModelDTO>

    protected abstract deleteUserById ( id: number ): Promise<void>

    protected abstract updateUserById ( id: number, data: IUpdatedUser ): Promise<IUserModelDTO>

    protected abstract createUser ( data: IUserModelDTO ): Promise<IUserModelDTO>
}

export interface getUserOptions {
    id: number;
    name: string;
    department: string
}

export interface IUpdatedUser {
    name: string;
    department: string;
    enterprise: string;
    role: string;
}
