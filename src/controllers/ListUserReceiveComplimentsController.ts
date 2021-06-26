import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController{

    async handle(request: Request, response: Response){

        // pega o id do usuário
        const { user_id } = request;

        // serviços
        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();
    
        const compliments = await listUserReceiveComplimentsService.execute(user_id);
    
        // retorna
        return response.json(compliments);
    }
}

export { ListUserReceiveComplimentsController };