import { IUserModel } from "../Models/IUserModel";
import { AuthService } from "../../provider/tokenProvider";

export abstract class AbstractLoginService extends AuthService {

    protected constructor () {
        super();
    }


    protected abstract login ( params: any ): Promise<any>;

    protected abstract logout ( params: any ): Promise<any>;

    protected abstract registerUser ( id: number, data: IRegisterUser ): Promise<IUserModel>;
}

export interface IRegisterUser {
    email: string;
    password: string;
}