import express, { Express } from 'express';
import dotenv from 'dotenv';
import { userRouter } from "./routes/userRouter";
import bodyParser from "body-parser";
import { loginRouter } from "./routes/loginRouter";
import { setupSwagger } from "./documentation/swagger";

export class App {
    private readonly app: Express;
    private readonly PORT;

    constructor () {
        const result = dotenv.config()

        if (result.error) {
            console.error("Error loading .env file: ", result.error);
            throw new Error("Missing environment variable")
        }

        this.PORT = process.env.PORT || 8080;
        this.app = express();
        this.app.use(bodyParser.json())
        this.initRouter()
        setupSwagger(this.app)
    }

    public initServer () {
        this.app.listen(this.PORT, () => {
            console.log(`Server running in http://localhost:${this.PORT}`);
        })
    }

    private initRouter () {
        this.app.use("/user", userRouter)
        this.app.use("/auth", loginRouter)
    }
}