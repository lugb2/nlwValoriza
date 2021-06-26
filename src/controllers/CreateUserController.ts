import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController{

    async handle(request: Request, response: Response){
        
        // pega dados da requisição
        const { name, email, admin, password } = request.body;

        // serviços
        const createUserService = new CreateUserService();

        // cria o usuário
        const user = await createUserService.execute({
            name,
            email,
            admin,
            password
        });

        // retorna
        return response.json(user);

    }
}

export { CreateUserController }