
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from '../typeorm/entities/Orders';
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "../../customers/typeorm/repositories/CustomersRepository";
import { ProductsRepository } from "../../products/typeorm/repositories/ProductsRepository";

interface IProduct {
    id:string;
    quantity:number;
}

interface IRequest {
   customer_id: string;
   products: IProduct[];
}

class CreateOrderService {

    async execute({customer_id, products}: IRequest): Promise<Order> {

        const ordersRepository =  getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository)

        const productExists =  await productRepository.findByName(name);

        if(productExists)
            throw new AppError('There is already one product with this name');

        const product = productRepository.create({
            name, price, quantity
        });

        await productRepository.save(product);


        return product;

    }

}


export default CreateOrderService;