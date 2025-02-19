import { AbstractLoginController } from "../types/Controller/loginController";
import { Request, response, Response } from "express";
import { z } from "zod";

export class LoginController extends AbstractLoginController {

    constructor () {
        super();
    }

    public async register ( req: Request, res: Response ): Promise<Response> {
        try {
            const { email, password, id } = req.body;

            const loginSchema = z.object({
                id: z.number().nonnegative(),
                email: z.string().email(),
                password: z.string().min(8).max(254)
            })

            const result = loginSchema.safeParse({ email, password, id })

            console.log(result)

            if (!result.success) {
                return res.status(400).send({
                    message: "Email or password is invalid",
                    status: "alert"
                })

            }

            const user = await this.registerUser(result.data.id, { email, password })
            return res.status(201).send({
                status: 'success',
                data: user,
                statusCode: 201
            })
        } catch (err: any) {
            return res.status(400).send({
                message: err.message,
                status: "error",
                statusCode: 400
            })
        }
    }

    public async signIn ( req: Request, res: Response ): Promise<Response> {
        try {

            const { email, password } = req.body;

            const token: string = await this.login({ email, password })

            //Salvar o token no cookie
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 Dia
                sameSite: "strict", // Restrige ao site
            });

            return res.status(200).send({
                status: 'success',
                statusCode: 200,
                authToken: token,
                message: "SingIn"
            })
        } catch (error: any) {
            return response.status(400).send({
                message: error.message,
                statusCode: 400
            })
        }
    }

    public async signOut ( req: Request, res: Response ): Promise<Response> {
        try {
            return res.status(200).send({
                message: 1
            })
        } catch (error: any) {
            return res.status(500)
        }
    }
}