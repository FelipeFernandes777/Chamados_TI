import Router from 'express';
import { UserController } from "../controller/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/listar-usuarios", ( req, res ) => {
    userController.getAll(req, res)
})
    .get("/listar/:id", ( req, res ) => {
        userController.getById(req, res)
    })
    .put("/:id", ( req, res ) => {
        userController.update(req, res)
    })
    .post("/", ( req, res ) => {
        userController.create(req, res)
    })
    .delete("/:id", ( req, res ) => {
        userController.delete(req, res)
    })

export { userRouter }
