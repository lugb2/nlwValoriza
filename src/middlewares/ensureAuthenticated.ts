import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub: string;
}

// função para garantir que usuário da requisição é admin
export function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
){

    // pega o token
    const authToken = request.headers.authorization;

    // verifica se token está preenchido
    if(!authToken){
        
        // sem autorização
        return response.status(401).end();
    }

    // separa o token (bearer é ignorado)
    const [, token] = authToken.split(" ");

    try{

        // validar a validade do token
        const {
            sub
        } = verify(
            token,
            "44624c5e1c9cd7c160cfcfe3b1a0f356"
        ) as IPayLoad;
        
        // recupera informações do usuário
        request.user_id = sub;

        // continua
        return next();

    }catch(err){
        // erro

        // sem autorização
        return response.status(401).end();
    }

}