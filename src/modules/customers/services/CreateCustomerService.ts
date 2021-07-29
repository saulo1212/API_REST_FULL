
import AppError from "../../../shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateCustomerService {

    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository
    ){}

    async execute({name, email}: ICreateCustomer): Promise<ICustomer> {


        const emailExists = await this.customerRepository.findByEmail(email);

        if(emailExists)
            throw new AppError('Email exists');

        
        const customer = await this.customerRepository.create({
            name,email
        });


        return customer;

    }

}
