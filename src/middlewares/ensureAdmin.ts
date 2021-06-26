import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../repositories/UsersRepositories";

// função para garantir que usuário da requisição é admin
export async function ensureAdmin(
    request: Request, 
    response: Response, 
    next: NextFunction
){

    // pega informação do usuário autenticado
    const { user_id } = request;

    // pega o repositório de usuários
    const usersRepositories = getCustomRepository(UsersRepositories);

    // consulta o usuário
    const user = await usersRepositories.findOne(user_id);

    // verifica se é usuário admin
    if(user.admin){
        // admin

        // prossegue requisição
        return next();
    }

    // sem autorização
    return response.status(401).json({
        error: "Unauthorized"
    })
}