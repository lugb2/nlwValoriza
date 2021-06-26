import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {

    async execute(user_id: string){

        // repositórios
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        
        // consulta elogios que o usuário recebeu
        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },

            // relações (joins)
            relations: ["userSender", "tag"]
        });

        // retorna
        return compliments;
    }
}

export { ListUserReceiveComplimentsService };