
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/errors/AppError";
import redisCache from "../../../shared/cache/RedisCache";

interface IRequest {
    id: string
}

class DeleteProductService {

    async execute({id}:IRequest): Promise<void> {

        const productRepository =  getCustomRepository(ProductsRepository)

        const product  = await productRepository.findOne(id);

        if(!product)
            throw new AppError('Product not found');

        
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productRepository.remove(product);

    }

}


export default DeleteProductService;