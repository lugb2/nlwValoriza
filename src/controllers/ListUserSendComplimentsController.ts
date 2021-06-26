import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";


class ListUserSendComplimentsController{

    async handle(request: Request, response: Response){

        // pega o id do usuário
        const { user_id } = request;

        // serviços
        const listUserSendComplimentsService = new ListUserSendComplimentsService();
    
        const compliments = await listUserSendComplimentsService.execute(user_id);
    
        // retorna
        return response.json(compliments);
    }
}

export { ListUserSendComplimentsController };