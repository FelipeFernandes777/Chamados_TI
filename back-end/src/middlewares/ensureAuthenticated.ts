import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function ensureAuthenticated ( req: Request, res: Response, next: NextFunction ) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ message: "Not authorized: No token provided" });
    }

    const [bearer, token] = authToken.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: "Not authorized: Invalid token format" });
    }

    try {
        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
            throw new Error("Secret key not found");
        }

        jwt.verify(token, secretKey);
        return next();
    } catch (error: any) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}