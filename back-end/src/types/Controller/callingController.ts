import { CallingService } from "../../service/callingService";
import { ICallingModelDTO } from "../Service/callingService";
import { Request, Response } from "express";

export abstract class AbstractCallingController extends CallingService {
    protected constructor () {
        super();
    }

    protected abstract getAll ( req: Request, res: Response ): Promise<Response<ICallingModelDTO[]>>

    protected abstract getByID ( req: Request, res: Response ): Promise<Response<ICallingModelDTO>>

    protected abstract create ( req: Request, res: Response ): Promise<Response<ICallingModelDTO>>

    protected abstract update ( req: Request, res: Response ): Promise<Response<ICallingModelDTO>>

    protected abstract delete ( req: Request, res: Response ): Promise<Response<void>>
}