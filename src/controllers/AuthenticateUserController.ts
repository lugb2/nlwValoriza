import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController{

    async handle(request: Request, response: Response){

        // parametros
        const { email, password } = request.body

        // serviços
        const authenticateUserService = new AuthenticateUserService();

        // cria o tooken
        const token = await authenticateUserService.execute({
            email,
            password
        });

        // retorno
        return response.json(token);
    }
}

export { AuthenticateUserController }