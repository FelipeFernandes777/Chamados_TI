import { Request, Response } from "express";
import { AbstractUserController } from "../types/Controller/userController";
import { IUserModel } from "../types/Models/IUserModel";

export class UserController extends AbstractUserController {
    constructor () {
        super();
    }

    public async getAll ( req: Request, res: Response ): Promise<Response<IUserModel[]>> {
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

    public async getById ( req: Request, res: Response ): Promise<Response<IUserModel>> {
        try {
            const { id, name, department } = req.body;

            const user = await this.getUserByIdOrNameOrDepartment({ id, name, department });
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

    public async update ( req: Request, res: Response ): Promise<Response<IUserModel>> {
        try {
            const { id } = req.params
            const { name, department, enterprise, role } = req.body;

            const user = await this.updateUserById(parseInt(id), { name, department, enterprise, role })

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

    public async create ( req: Request, res: Response ): Promise<Response<IUserModel>> {
        try {
            const { name, department, enterprise, role } = req.body

            console.log(req.body)

            const user = await this.createUser({ name, department, enterprise, role })

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
