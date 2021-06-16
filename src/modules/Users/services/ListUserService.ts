
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

export default class ListUserService {

    async execute(): Promise<User[]> {

        const userstRepository =  getCustomRepository(UsersRepository)

        const users  = await userstRepository.find();

        return users;

    }

}
