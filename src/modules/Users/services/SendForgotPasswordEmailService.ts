
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path';
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../infra/typeorm/repositories/UsersTokensRepository";
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


        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');


        await EtherealMail.sendMail({
            to:{
                name:user.name,
                email: user.email
            },
            subject:'[API de vendas] Recuperação de senha',
            templateData:{
                file:forgotPasswordTemplate,
                variables:{
                    name:user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
          
        });
    }

}
