import { Request, Response } from "express";
import { UserService } from "../../service/userService";
import { IUserModelDTO } from "../Models/IUserModel";

export abstract class AbstractUserController extends UserService {
    protected constructor () {
        super();
    }

    public abstract getAll ( req: Request, res: Response ): Promise<Response<IUserModelDTO[]>>

    public abstract getUser ( req: Request, res: Response ): Promise<Response<IUserModelDTO>>

    public abstract update ( req: Request, res: Response ): Promise<Response<IUserModelDTO>>

    public abstract delete ( req: Request, res: Response ): Promise<Response>

    public abstract create ( req: Request, res: Response ): Promise<Response<IUserModelDTO>>
}