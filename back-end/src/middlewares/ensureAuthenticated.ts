import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated ( req: Request, res: Response, next: NextFunction ) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).send("Not authorized");
    }

    const [bearer, token] = authToken.split(' '); // Separa o token do bearer

    try {

        const secretKey = process.env.SECRET_KEY;

        if (secretKey) {
            verify(token, secretKey);
            return next()
        }

        throw new Error("Secret key not found");
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}