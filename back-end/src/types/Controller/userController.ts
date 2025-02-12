import { Request, Response } from "express";
import { UserService } from "../../service/userService";
import { IUserModel } from "../Models/IUserModel";

export abstract class AbstractUserController extends UserService {
    protected constructor () {
        super();
    }

    public abstract getAll ( req: Request, res: Response ): Promise<Response<IUserModel[]>>

    public abstract getById ( req: Request, res: Response ): Promise<Response<IUserModel>>

    public abstract update ( req: Request, res: Response ): Promise<Response<IUserModel>>

    public abstract delete ( req: Request, res: Response ): Promise<Response>

    public abstract create ( req: Request, res: Response ): Promise<Response<IUserModel>>
}