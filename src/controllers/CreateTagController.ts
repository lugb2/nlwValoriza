import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController{

    async handle(request: Request, response: Response){

        // pega dados da requisição
        const { name } = request.body;

        // serviçoes
        const createTagService = new CreateTagService();

        // cria a tag
        const tag = await createTagService.execute(name);

        return response.json(tag)
    }
}

export { CreateTagController };