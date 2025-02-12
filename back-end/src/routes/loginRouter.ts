import Router from "express";
import { LoginController } from "../controller/loginController";

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post("/registrar/:id", ( req, res ) => {
    loginController.register(req, res)
})
    .post("/login", ( req, res ) => {
        loginController.signIn(req, res)
    })

export { loginRouter }
