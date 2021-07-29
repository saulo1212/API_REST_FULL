import {v4 as uuidV4} from 'uuid';
import { ICustomersRepository } from "../../../domain/repositories/ICustomersRepository";
import Customers from "../../../infra/typeorm/entities/Customers";
import { ICreateCustomer } from "../../../domain/models/ICreateCustomer";

export default class FakeCustomersRepository  implements Omit<ICustomersRepository, 'remove' | 'findAll'>  {
    
    private customers: Customers[] = [];
    
    public async create({name, email}: ICreateCustomer): Promise<Customers>{

        const customer = new Customers();

        customer.id = uuidV4();
        customer.name = name;
        customer.email = email;

        this.customers.push(customer);

        return customer;
    }

    public async save(customer: Customers): Promise<Customers>{

        Object.assign(this.customers, customer);

        return customer;
    }

    public async findByName(name:string): Promise<Customers | undefined>{

        const customer = this.customers.find(customer => customer.name === name);

        return customer;
    }

    public async findById(id:string): Promise<Customers | undefined>{

        const customer = this.customers.find(customer => customer.id === id);

        return customer;
    }

    public async findByEmail(email:string): Promise<Customers | undefined>{

        const customer = this.customers.find(customer => customer.email === email);

        return customer;
    }

    
}