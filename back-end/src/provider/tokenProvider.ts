import jsonWebToken from "jsonwebtoken";

export class AuthService {

    constructor () {

    }

    protected async generateToken ( id: number ): Promise<string> {
        try {
            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                throw new Error("SECRET_KEY is not defined in the environment variables.");
            }

            const payload = {
                userId: id,
                role: "user"
            };

            return jsonWebToken.sign(payload, secretKey, {
                subject: id.toString(),
                expiresIn: "1d"
            });
        } catch (error) {
            console.error("Error generating token:", error);
            throw error
        }
    }
}