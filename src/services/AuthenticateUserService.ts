import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({ email, password }: IAuthenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);

        // verifica se o email existe
        const user = await usersRepositories.findOne({
            email
        });
        
        // verifica se encontrou
        if(!user){

            // erro
            throw new Error("Email/Password incorrect");
        }

        // verifica a senha
        const passwordMatch = await compare(password, user.password);

        // verifica se senha está correta
        if(!passwordMatch){

            // erro
            throw new Error("Email/Password incorrect");
        }

        // gera e retorna token
        const token = sign(
            {
                email: user.email
            },
            "44624c5e1c9cd7c160cfcfe3b1a0f356",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService };