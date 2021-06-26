import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService{

    async execute(name: string){

        // pega o repositório
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if(!name){
            throw new Error("Incorrect name!");
        }

        // consulta tag pelo nome
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });

        // verifica se já existe
        if(tagAlreadyExists){
            throw new Error("Tag already exists!");
        }

        // cria a tag
        const tag = tagsRepositories.create({
            name
        });

        // salva
        await tagsRepositories.save(tag);

        // retorna
        return tag;
        
    }
}

export { CreateTagService };