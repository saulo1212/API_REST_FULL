
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from '../../../config/mail/EtherealMail';

interface IRequest {
    email: string;
}

export default  class SendForgotPasswordEmailService {

    async execute({email}: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);

        const userTokenRepository = getCustomRepository(UsersTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user)
            throw new AppError('Email nos exists!');

        const  {token} = await userTokenRepository.generate(user.id);

        await EtherealMail.sendMail({
            to:{
                name:user.name,
                email: user.email
            },
            subject:'[API de vendas] Recuperação de senha',
            templateData:{
                template:`Ola {{name}}: {{token}}`,
                variables:{
                    name:user.name,
                    token
                }
            }
          
        });
    }

}
