
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import {isAfter, addHours} from 'date-fns';
import {hash} from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

export default  class ResetPasswordService {

    async execute({token,password}: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);

        const userTokenRepository = getCustomRepository(UsersTokensRepository);

        const userToken = await  userTokenRepository.findByToken(token)

        if(!userToken)
            throw new AppError('Token nos exists!');

        const user = await usersRepository.findById(userToken.user_id);


        if(!user)
            throw new AppError('User nos exists!');

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate))
            throw new AppError('Token expired!');

        user.password = await hash(password,8);


       
    }

}
