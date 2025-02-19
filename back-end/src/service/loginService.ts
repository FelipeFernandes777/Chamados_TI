import { AbstractLoginService, IRegisterUser } from "../types/Service/loginService";
import { IUserModelDTO } from "../types/Models/IUserModel";
import { prisma } from "../config/dbConfig";
import { compare, hash } from "bcrypt"

export class LoginService extends AbstractLoginService {

    private readonly db = prisma

    protected async login ( params: { email: string, password: string } ): Promise<string> {
        try {

            if (!params.email || !params.password) {
                throw new Error("Email and password are required.");
            }

            const userLogin = await this.db.userLogin.findFirst({
                where: {
                    email: params.email,
                },
                include: {
                    user: true,
                },
            });

            if (!userLogin) {
                throw new Error("User not found.");
            }

            const passwordMatch = await compare(params.password, userLogin.password);

            if (!passwordMatch) {
                console.error("User or password is incorrect")
                throw new Error("User or password is incorrect")
            }

            return await this.generateToken(userLogin.user.id);
        } catch (error) {
            throw error;
        }
    }

    protected logout ( params: any ): Promise<any> {
        return Promise.resolve(undefined);
    }

    protected async registerUser ( id: number, data: IRegisterUser ): Promise<IUserModelDTO> {
        if (!id || !data.email || !data.password) {
            console.log(data)
            throw new Error("Invalid Params")
        }
        try {
            const hashedPassword = await hash(data.password, 10)
            console.log(hashedPassword)

            await this.db.userLogin.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    user: {
                        connect: {
                            id: id,
                        }
                    }
                }
            })

            return await this.db.user.findFirst({
                where: {
                    id: id
                },
                select: {
                    Calling: true,
                    Login: {
                        select: {
                            email: true,
                            password: false
                        }
                    },
                }
            })
        } catch (err) {
            console.log("Error login Service")
            throw err;
        }
    }

}