
import { getCustomRepository } from "typeorm";
import Customers from "../typeorm/entities/Customers";
import  CustomersRepository from '../typeorm/repositories/CustomersRepository';


export default class ListCustomerService {

    async execute(): Promise<Customers[]> {

        const customersRepository =   getCustomRepository(CustomersRepository)

        const customers  = await customersRepository.find()

        return customers;

    }

}
