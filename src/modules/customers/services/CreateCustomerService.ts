
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customers from "../infra/typeorm/entities/Customers";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService {

    async execute({name, email}: IRequest): Promise<Customers> {

        const customersRepository = getCustomRepository(CustomersRepository);

        const emailExists = await customersRepository.findByEmail(email);

        if(emailExists)
            throw new AppError('Email exists');

        
        const customer = customersRepository.create({
            name,email
        });

        await customersRepository.save(customer);

        return customer;

    }

}
