import { IUserModel } from "../Models/IUserModel";

export abstract class AbstractUserService {
    protected abstract getAllUsers ( skip: number, take: number ): Promise<IUserModel[]>

    protected abstract getUserByIdOrNameOrDepartment ( data: getUserOptions ): Promise<IUserModel>

    protected abstract deleteUserById ( id: number ): Promise<void>

    protected abstract updateUserById ( id: number, data: IUpdatedUser ): Promise<IUserModel>

    protected abstract createUser ( data: IUserModel ): Promise<IUserModel>
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
