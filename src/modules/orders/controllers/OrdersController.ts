import { Request, Response } from "express";
import ShowOrderService from "../services/CreateOrderService";
import CreateOrderService from "../services/ShowOrderService";


export default class OrdersController {

    async show(request: Request, response: Response):Promise<Response>{

        const {id} = request.params;

        const showOrder = new ShowOrderService;

        const order =  await showOrder.execute({id});

        return response.json(order);
    }

    async create(request: Request, response: Response):Promise<Response>{

        const {customer_id, products} = request.body;

        const createOrder = new CreateOrderService;

        const order  = await createOrder.execute({
            customer_id, products
        });


        return response.json(order);

    }

}

