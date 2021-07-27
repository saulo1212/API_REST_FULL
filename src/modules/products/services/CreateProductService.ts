
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import redisCache from "../../../shared/cache/RedisCache";

interface IRequest {
    name: string;
    price: number;
    quantity: number
}

class CreateProductService {

    async execute({name, price, quantity}: IRequest): Promise<Product> {

        const productRepository =  getCustomRepository(ProductsRepository)

        const productExists =  await productRepository.findByName(name);

        if(productExists)
            throw new AppError('There is already one product with this name');


        const product = productRepository.create({
            name, price, quantity
        });

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productRepository.save(product);


        return product;

    }

}


export default CreateProductService;