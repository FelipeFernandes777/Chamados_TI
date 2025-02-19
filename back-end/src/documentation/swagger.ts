import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chamados T.I API",
            version: "1.0.0",
            description: "Documentação da API de chamados para equipe de T.I",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 8888}`,
                description: "Servidor Local",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "João Silva" },
                        department: { type: "string", example: "Suporte" },
                        enterprise: { type: "string", example: "Tech Corp" },
                        role: { type: "string", example: "Administrador" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                },
                UserLogin: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        email: { type: "string", example: "user@example.com" },
                        password: { type: "string", example: "senha123" },
                        userId: { type: "integer", example: 1 },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                },
                Calling: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        title: { type: "string", example: "Erro no sistema" },
                        status: { type: "string", example: "Aberto" },
                        priority: { type: "string", example: "Alta" },
                        date: { type: "string", format: "date-time" },
                        description: { type: "string", example: "Sistema não carrega a página de login" },
                        type: { type: "string", example: "Suporte Técnico" },
                        userId: { type: "integer", example: 1 },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [],
};

const paths = {
    "/users/listar-usuarios": {
        get: {
            summary: "Lista todos os usuários",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Lista de usuários",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/User" },
                            },
                        },
                    },
                },
            },
        },
    },
    "/users/listar/{id}": {
        get: {
            summary: "Obtém um usuário pelo ID",
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
            responses: {
                200: {
                    description: "Usuário encontrado",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/User" },
                        },
                    },
                },
                404: { description: "Usuário não encontrado" },
            },
        },
    },
    "/user/": {
        post: {
            summary: "Cria um novo usuário",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/User" },
                    },
                },
            },
            responses: {
                201: { description: "Usuário criado com sucesso" },
            },
        },
    },
    "/user/{id}": {
        put: {
            summary: "Atualiza um usuario",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/User" },
                    },
                },
            },
            responses: {
                201: { description: "Usuário alterado com sucesso" },
            },
        },
        delete: {
            summary: "Deleta um usuario",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/User" },
                    },
                },
            },
            responses: {
                204: { description: "Usuario deletado com sucesso" },
            },
        },
    },
    "/auth/registrar/${id}": {
        post: {
            summary: "Registrar login do usuario",
            security: false,
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UserLogin" },
                    }
                }
            },
            responses: {
                201: { description: "Login criado com sucesso" }
            }
        }
    },
    "/auth/login}": {
        post: {
            summary: "Login do usuario",
            security: false,
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UserLogin" },
                    }
                }
            },
            responses: {
                200: { description: "token" }
            }
        }
    },
};

options.definition.paths = paths;

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = ( app: Express ): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
