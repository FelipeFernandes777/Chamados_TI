import { AbstractLoginController } from "../types/Controller/loginController";
import { Request, response, Response } from "express";

export class LoginController extends AbstractLoginController {

    constructor () {
        super();
    }

    public async register ( req: Request, res: Response ): Promise<Response> {
        try {
            const id = req.params.id;
            const { email, password } = req.body;

            const user = await this.registerUser(parseInt(id), { email, password })
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

            const token = await this.login({ email, password })

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