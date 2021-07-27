import { Request, Response } from "express";
import CreateCustomerService from "../../../services/CreateCustomerService";
import DeleteCustomerService from "../../../services/DeleteCustomerService";
import ListCustomerService from "../../../services/ListCustomerService";
import ShowCustomerService from "../../../services/ShowCustomerService";
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomersController {

    async index(request: Request, response: Response):Promise<Response>{

        const listCustomers =  new ListCustomerService

        const customers = await listCustomers.execute();
        
        return response.json(customers);
    }

    async show(request: Request, response: Response):Promise<Response>{

        const {id} = request.params;

        const showConsumer = new ShowCustomerService()

        const customer =  await showConsumer.execute({id});

        return response.json(customer);
    }

    async create(request: Request, response: Response):Promise<Response>{

        const {name,email} = request.body;

        const createCustomer = new CreateCustomerService();

        const customer  = await createCustomer.execute({
            name, email
        });


        return response.json(customer);

    }

    async updated(request: Request, response: Response):Promise<Response>{

        const {id} = request.params;
        const {name,email} = request.body;

        const updatedCustomer =  new UpdateCustomerService()

        const customer = await updatedCustomer.execute({
            id, name, email
        });

        return response.json(customer);

    }


    async delete(request: Request, response: Response):Promise<Response>{

        const {id} = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({id});

        return response.json([]);

    }

}

