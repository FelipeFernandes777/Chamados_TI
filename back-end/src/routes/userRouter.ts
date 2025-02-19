import Router from 'express';
import { UserController } from "../controller/userController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRouter = Router();
const userController = new UserController();

userRouter
    .post("/", ( req, res ) => {
        userController.create(req, res)
    })
    .get("/listar-usuarios", ensureAuthenticated, ( req, res ) => {
    userController.getAll(req, res)
})
    .get("/listar/:id", ensureAuthenticated, ( req, res ) => {
        userController.getUser(req, res)
    })
    .put("/:id", ensureAuthenticated, ( req, res ) => {
        userController.update(req, res)
    })
    .delete("/:id", ensureAuthenticated, ( req, res ) => {
        userController.delete(req, res)
    })

export { userRouter }
