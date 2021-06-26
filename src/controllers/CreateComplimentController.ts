import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentServer";


class CreateComplimentController{

    async handle(request: Request, response: Response){

        // parâmetros
        const { user_id } = request;
        const { tag_id, user_receiver, message } = request.body;

        // serviços
        const createComplimentService = new CreateComplimentService();

        // cadastra o elogio
        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        });

        // retorna
        return response.json(compliment);
    }
}

export { CreateComplimentController };