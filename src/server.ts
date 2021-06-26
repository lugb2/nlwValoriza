import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { router } from './routes';

import "./database";

const app = express();
app.use(cors());

// habilita envio do corpo como json
app.use(express.json());

/*
    GET     => Buscar
    POST    => Inserir
    PUT     => Atualizar
    DELETE  => Deletar
    PATCH   => Alterar info específica
*/

// cria as apis a partir das rotas
app.use(router);

// middleware - função entre a função o retorno
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    
    // verifica se é um erro
    if(err instanceof Error){

        // retorna o erro (com status 400)
        return response.status(400).json({
            error: err.message
        });
    }

    // outro erro
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"))