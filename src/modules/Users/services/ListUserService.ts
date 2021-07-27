
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

export default class ListUserService {

    async execute(): Promise<User[]> {

        const userstRepository =  getCustomRepository(UsersRepository)

        const users  = await userstRepository.find();

        return users;

    }

}
