
import { getCustomRepository } from "typeorm";
import Customers from "../typeorm/entities/Customers";
import  CustomersRepository from '../typeorm/repositories/CustomersRepository';


interface IPaginateCustomer {
    from:number;
    to:number;
    per_page:number;
    total:number;
    current_page:number;
    prev_page:number;
    next_page:number;
    last_page:number;
    data: Customers[];
}

export default class ListCustomerService {

    async execute(): Promise<IPaginateCustomer> {

        const customersRepository =   getCustomRepository(CustomersRepository)

        const customers  = await  customersRepository.createQueryBuilder().paginate()

        return customers as IPaginateCustomer;

    }

}
