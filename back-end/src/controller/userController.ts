import { Request, Response } from "express";
import { AbstractUserController } from "../types/Controller/userController";
import { IDepartment, IEnterprise, IRole, IUserModelDTO } from "../types/Models/IUserModel";
import { z } from "zod"

export class UserController extends AbstractUserController {
    constructor () {
        super();
    }

    public async getAll ( req: Request, res: Response ): Promise<Response<IUserModelDTO[]>> {
        try {
            const skip = parseInt(req.body.skip) || 1;
            const take = parseInt(req.body.take) || 10;

            const users = await this.getAllUsers(skip, take);
            return res.status(200).send({
                data: users,
                status: 'success',
                statusCode: 200
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(400).json({ message: "Could not retrieve users" });
        }
    }

    public async getUser ( req: Request, res: Response ): Promise<Response<IUserModelDTO>> {
        try {
            const { id, name, department } = req.body;

            const getUser = z.object({
                id: z.number().min(1).nonnegative(),
                name: z.string().min(8).max(254),
                department: z.nativeEnum(IDepartment)
            })

            const result = getUser.safeParse({ id, name, department });

            if (!result.success) {
                return res.status(400).send({
                    message: "Id or name or department is invalid",
                    status: "alert",
                    statusCode: 400
                })
            }

            const user = await this.getUserByIdOrNameOrDepartment(result);
            return res.status(200).send({
                data: user,
                status: 'success',
                statusCode: 200
            });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(400).json({ message: "Could not retrieve user" });
        }
    }

    public async delete ( req: Request, res: Response ): Promise<Response<void>> {
        try {
            const { id } = req.params;

            console.log("Received request to delete user with id:", id);

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "Invalid user ID" });
            }

            await this.deleteUserById(Number(id));

            return res.status(204).json({
                status: "success",
                message: `User with id ${id} deleted`,
                statusCode: 204
            });
        } catch (error: any) {
            console.error("Error deleting user:", error.message || error);
            return res.status(500).json({ message: "Could not delete user" });
        }

    }

    public async update ( req: Request, res: Response ): Promise<Response<IUserModelDTO>> {
        try {
            const { id } = req.params
            const { name, department, enterprise, role } = req.body;

            const getUser = z.object({
                name: z.string().min(8).max(254),
                department: z.nativeEnum(IDepartment),
                enterprise: z.nativeEnum(IEnterprise),
                role: z.nativeEnum(IRole)
            })

            const result = getUser.safeParse({ name, department, enterprise, role });

            if (!result.success) {
                return res.status(400).send({
                    message: "One or more values is invalid",
                    status: "alert",
                    statusCode: 400,
                    error: result.error.format()
                })
            }

            const user = await this.updateUserById(parseInt(id), result)

            return res.status(200).send({
                data: user,
                status: 'success',
                statusCode: 200
            });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(400).json({ message: "Could not retrieve users" });
        }
    }

    public async create ( req: Request, res: Response ): Promise<Response<IUserModelDTO>> {
        try {
            const { name, department, enterprise, role } = req.body

            console.log(req.body)

            const getUser = z.object({
                name: z.string().min(8).max(254),
                department: z.nativeEnum(IDepartment),
                enterprise: z.nativeEnum(IEnterprise),
                role: z.nativeEnum(IRole)
            })

            const result = getUser.safeParse({ name, department, enterprise, role });

            console.log("Result: ", result)

            if (!result.success) {
                return res.status(400).send({
                    message: "One or more values is invalid",
                    status: "alert",
                    statusCode: 400
                })
            }

            const user = await this.createUser({ name, department, enterprise, role });

            return res.status(201).send({
                status: 'success',
                statusCode: 201,
                data: user,
            })
        } catch (error) {
            return res.status(400).send({
                message: "Failed to create User"
            })
        }
    }
}
