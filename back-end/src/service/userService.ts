import { prisma } from "../config/dbConfig";
import { IUserModel } from "../types/Models/IUserModel";
import { AbstractUserService, getUserOptions, IUpdatedUser } from "../types/Service/userService";

export class UserService extends AbstractUserService {
    private readonly db = prisma;

    protected async getAllUsers ( skip: number = 1, take: number = 10 ): Promise<IUserModel[]> {
        try {
            return await this.db.user.findMany({
                skip: (skip - 1) * take,
                take: take,
                select: {
                    id: true,
                    name: true,
                    Login: {
                        select: {
                            email: true,
                            password: false,
                        }
                    },
                    enterprise: true,
                    role: true,
                    department: true,
                    created_at: true,
                    updated_at: true,
                    Calling: false,
                }
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Could not retrieve users");
        }
    }

    protected async getUserByIdOrNameOrDepartment ( data: getUserOptions ): Promise<IUserModel> {
        try {
            return await this.db.user.findFirst({
                where: {
                    id: data.id,
                    name: data.name,
                    department: data.department
                },
                select: {
                    Calling: true,
                    Login: {
                        select: {
                            email: true
                        }
                    },
                }
            })
        } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error("Could not retrieve user");
        }
    }

    protected async deleteUserById ( userId: number ): Promise<void> {
        try {
            console.log(`Attempting to delete user with id: ${userId}`);

            await this.db.user.delete({
                where: { id: userId }
            });

            console.log(`User with id ${userId} deleted successfully.`);
        } catch (error: any) {
            console.error("Error deleting user:", error.message || error);
            throw new Error("Could not delete user");
        }
    }

    protected async updateUserById ( id: number, data: IUpdatedUser ): Promise<IUserModel> {
        try {
            return await this.db.user.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    department: data.department,
                    enterprise: data.enterprise,
                    role: data.role,
                }
            })
        } catch (error) {
            console.error("Error deleting user:", id);
            throw new Error("Could not retrieve user");
        }
    }

    protected async createUser ( data: IUserModel ): Promise<IUserModel> {
        if (!data.name || !data.department || !data.enterprise || !data.role) {
            throw new Error("Missing required fields: name, department, enterprise, or role");
        }

        try {
            const userAlreadyExists = await this.db.user.findFirst({
                where: {
                    name: data.name,
                    department: data.department,
                    enterprise: data.enterprise,
                },
            });

            if (userAlreadyExists) {
                console.error("User already exists:", data.name);
                throw new Error("User already exists");
            }

            return await this.db.user.create({
                data: {
                    name: data.name,
                    department: data.department,
                    enterprise: data.enterprise,
                    role: data.role,
                },
            });

        } catch (error: any) {
            console.error("Error creating user:", error.message);
            throw new Error("Could not create user");
        }
    }
}
