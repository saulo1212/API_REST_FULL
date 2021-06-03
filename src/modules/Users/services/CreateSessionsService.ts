
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";


interface IRequest {
    email: string;
    password: string
}



export default class CreateSessionsService {

    async execute({ email, password}: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user)
            throw new AppError('Dados invalidos!', 401);

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed)
            throw new AppError('Dados inalidos!', 401);
    

        return user;

    }

}


