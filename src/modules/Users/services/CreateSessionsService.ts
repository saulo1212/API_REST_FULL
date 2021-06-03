
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface IRequest {
    email: string;
    password: string
}

interface IResponse {
    user: User; 
    token: string;
}

export default class CreateSessionsService {

    async execute({ email, password}: IRequest): Promise<IResponse> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user)
            throw new AppError('Dados invalidos!', 401);

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed)
            throw new AppError('Dados inalidos!', 401);

        
        const token = sign({}, '8a5da52ed126447d359e70c05721a8aa',{
            subject:user.id,
            expiresIn:'1d'
        });
    

        return {
            user, token
        };

    }

}


