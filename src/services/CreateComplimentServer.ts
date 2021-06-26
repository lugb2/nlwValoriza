import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({
        tag_id,
        user_sender,
        user_receiver,
        message
    }: IComplimentRequest){

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        // verifica se é um auto elogio
        if(user_sender === user_receiver){
            
            throw new Error("Incorrect User Receiver");
        }

        // consulta o usuário que receberá o elogio
        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        // se não encontrou o usuário
        if(!userReceiverExists){

            // retorna erro
            throw new Error("User Receiver does not exist!");
        }

        // tudo certo

        // cria o elogio
        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        // cadastra
        await complimentsRepositories.save(compliment);   

        // retorna
        return compliment;

    }
}

export { CreateComplimentService };