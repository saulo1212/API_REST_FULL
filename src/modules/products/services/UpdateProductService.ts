
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
    id: string;
    name:string;
    price:number;
    quantity:number;
}

class UpdateProductService {

    async execute({id, name, price, quantity}:IRequest): Promise<Product> {

        const productRepository =  getCustomRepository(ProductsRepository)

        const product  = await productRepository.findOne(id);

        if(!product)
            throw new AppError('Product not found');

        const productExists =  await productRepository.findByName(name);

        if(productExists)
            throw new AppError('There is already one product with this name');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);
    

        return product;

    }

}


export default UpdateProductService;
