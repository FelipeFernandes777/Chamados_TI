import { LoginService } from "../../service/loginService";
import { Request, Response } from "express";

export abstract class AbstractLoginController extends LoginService {

    protected constructor () {
        super();
    }

    public abstract signIn ( req: Request, res: Response ): Promise<Response>

    public abstract signOut ( req: Request, res: Response ): Promise<Response>

    public abstract register ( req: Request, res: Response ): Promise<Response>
}