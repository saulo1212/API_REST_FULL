import { ICustomersRepository } from "../../../domain/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import Customers from "../entities/Customers";
import { ICreateCustomer } from "../../../domain/models/ICreateCustomer";


export default class CustomersRepository  implements ICustomersRepository {

    private ormRepository: Repository<Customers>;

    constructor(){
        this.ormRepository = getRepository(Customers);
    }

    public async create({name, email}: ICreateCustomer): Promise<Customers>{

        const customer = this.ormRepository.create({name,email});

        await this.ormRepository.save(customer);

        return customer;
    }

    public async save(customer:Customers): Promise<Customers>{
        
        await this.ormRepository.save(customer);


        return customer;
    }

    public async findByName(name:string):Promise<Customers | undefined>{

        const customer = await this.ormRepository.findOne({
            where:{name}
        });

        return customer;
    }


    public async findById(id:string):Promise<Customers | undefined>{

        const customer = await this.ormRepository.findOne({
            where:{id}
        });

        return customer;
    }


    public async findByEmail(email:string):Promise<Customers | undefined>{

        const customer = await this.ormRepository.findOne({
            where:{email}
        });

        return customer;
    }
}