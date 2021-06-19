import { EntityRepository, Repository } from "typeorm";
import Customers from "../entities/Customers";


@EntityRepository(Customers)
export default class CustomersRepository extends Repository<Customers> {

    async findByName(name:string):Promise<Customers | undefined>{

        const customer = await this.findOne({
            where:{name}
        });

        return customer;
    }


    async findById(id:string):Promise<Customers | undefined>{

        const customer = await this.findOne({
            where:{id}
        });

        return customer;
    }


    async findByEmail(email:string):Promise<Customers | undefined>{

        const customer = await this.findOne({
            where:{email}
        });

        return customer;
    }
}