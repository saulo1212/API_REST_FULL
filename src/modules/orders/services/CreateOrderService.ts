import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from '../infra/typeorm/entities/Orders';
import OrdersRepository from "../infra/typeorm/repositories/OrdersRepository";
import CustomersRepository from "../../customers/infra/typeorm/repositories/CustomersRepository";
import { ProductsRepository } from "../../products/infra/typeorm/repositories/ProductsRepository";


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

        const serializeProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price
        }));s


        const order =  await ordersRepository.createOrder({
            customer: customerExits,
            products: serializeProducts
        });

        const {order_products} = order;

        const updateProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        }));

        await productsRepository.save(updateProductQuantity);

        return order;
    }

}


export default CreateOrderService;
