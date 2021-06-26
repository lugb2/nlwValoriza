import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUsersService{

    async execute(){
         
        // repositórios
        const usersRepositories = getCustomRepository(UsersRepositories);

        // consulta
        const users = await usersRepositories.find();

        // retorna
        return classToPlain(users);
    }
}

export { ListUsersService };