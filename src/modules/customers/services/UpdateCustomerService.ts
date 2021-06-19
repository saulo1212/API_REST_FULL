
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customers from "../typeorm/entities/Customers";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IRequest {
    id: string;
    name:string;
    email:string;
}

export default class UpdateProfileService {

    async execute({id,name, email}: IRequest): Promise<Customers> {

        const customerstRepository =  getCustomRepository(CustomersRepository)

        const customer  = await customerstRepository.findById(id);

        if(!customer)
            throw new AppError('Customer not found');

        const customerUpdateEmail = await customerstRepository.findByEmail(email);


        if(customerUpdateEmail && email !== customerUpdateEmail.email)
            throw new AppError('There is already one customer with this email');

        customer.name = name;
        customer.email = email

        await customerstRepository.save(customer);
        
        return customer;

    }

}
