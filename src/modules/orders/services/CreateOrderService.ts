
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

        const customerExits = await customerRepository.findById(customer_id);

        if(!customerExits)
            throw new AppError('could not find  any customer with');

        const existsProducts = await productsRepository.findAllByIds(products);

        if(!existsProducts.length)
            throw new AppError('could not find  any productsIds with');

        const existsProductsIds =  existsProducts.map(product => product.id);


        const checkInexistentsProducts =  products.filter(
            product => !existsProductsIds.includes(product.id)
        )

        if(checkInexistentsProducts.length)
            throw new AppError(`could not find ${checkInexistentsProducts[0].id}`);

        const quantityAvailable =  products.filter(
            product => existsProducts.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity
        );
        
        
        if(quantityAvailable.length)
            throw new AppError(`The quantity ${quantityAvailable[0].quantity}`);

    }

}


export default CreateOrderService;