import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService{

    async execute(){

        // repositórios
        const tagsRepositories = getCustomRepository(TagsRepositories);

        // consulta
        const tags = await tagsRepositories.find();

        // retorna
        return classToPlain(tags);
    }
}

export { ListTagsService };