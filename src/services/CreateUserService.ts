import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{

    async execute({
        name,
        email,
        admin = false,
        password
    }: IUserRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);

        // confere o email enviado
        if(!email){
            throw new Error("Email incorrect");
        }

        // consulta usuário pelo email
        const userAlreadyExists = await usersRepositories.findOne({
            email
        });

        // verifica se usuário é existente
        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        // tudo certo

        // cria a senha criptografada
        const passwordHash = await hash(password, 8);

        // cadastra o usuário
        const user = usersRepositories.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        // salva
        await usersRepositories.save(user);

        // retorna
        return user;

    }
}

export { CreateUserService };