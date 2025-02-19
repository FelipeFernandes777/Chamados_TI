import { AbstractCallingController } from "../types/Controller/callingController";
import { Request, response, Response } from "express";
import { ICallingModelDTO, IPriority, IStatus } from "../types/Service/callingService";
import { z } from "zod";

export class CallingController extends AbstractCallingController {
    constructor () {
        super();
    }

    protected async create ( req: Request, res: Response ): Promise<Response<ICallingModelDTO>> {
        try {
            const { id } = req.params;
            const { title, type, description, status, priority } = req.body;

            const callingRequestSchema = z.object({
                title: z.string().min(3).max(30),
                type: z.string().min(3).max(30),
                description: z.string().min(3).max(254),
                status: z.nativeEnum(IStatus),
                priority: z.nativeEnum(IPriority),
            })

            const result = callingRequestSchema.safeParse({ title, type, description, status, priority })

            if (!result.success) {
                return res.status(400).send({
                    message: "Data is missing",
                    status: "alert",
                    statusCode: 400
                })
            }

            const newCalling = await this.createCalling(parseInt(id), result)

            return response.status(201).send({
                status: 'success',
                data: newCalling
            })
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    protected async delete ( req: Request, res: Response ): Promise<Response<void>> {
        try {
            const { id } = req.body;

            await this.deleteCalling(id);

            return res.status(204).send({
                status: "success",
                message: "Calling deleted with success"
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    protected async getAll ( req: Request, res: Response ): Promise<Response<ICallingModelDTO[]>> {
        try {
            const { take, skip } = req.body;

            const paginationSchema = z.object({
                take: z.number().min(1).max(20),
                skip: z.number().min(1).max(254),
            })

            const result = paginationSchema.safeParse({ take, skip })

            const callings = await this.getAllCallings(result);

            return res.status(200).send({
                data: callings,
                status: "success"
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    protected async getByID ( req: Request, res: Response ): Promise<Response<ICallingModelDTO>> {
        try {
            const id = req.params.id;

            const calling = await this.getCallingById(id);

            return res.status(200).send({
                data: calling,
                status: "success"
            })
        } catch (err) {
            return res.status(400).send({ err: err, status: "error" })
        }
    }

    protected async update ( req: Request, res: Response ): Promise<Response<ICallingModelDTO>> {
        try {
            const id = req.params.id;

            const { title, description, type, status } = req.body;

            const updateCallingSchema = z.object({
                title: z.string().min(3).max(254).nonempty(),
                description: z.string().min(3).max(254),
                type: z.string().min(3).max(254),
                status: z.nativeEnum(IStatus),
            })

            const result = updateCallingSchema.safeParse({ title, description, type, status })

            if (result.success) {
                res.status(400).send({
                    message: "One or more values is invalid",
                    status: "alert",
                    statusCode: 400
                })
            }

            const newCalling = await this.updateCalling(id, result);

            return res.status(200).send({
                data: newCalling,
                status: "success"
            })
        } catch (err) {
            return res.status(400).send({ err: err, status: "error" })
        }
    }
}