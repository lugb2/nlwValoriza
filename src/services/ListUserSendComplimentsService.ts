import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService {

    async execute(user_id: string){

        // repositórios
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        
        // consulta elogios que o usuário enviou
        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: user_id
            },

            // relações (joins)
            relations: ["userReceiver", "tag"]
        });

        // retorna
        return compliments;
    }
}

export { ListUserSendComplimentsService };