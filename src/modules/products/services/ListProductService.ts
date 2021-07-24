
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import redisCache from "../../../shared/cache/RedisCache";


class ListProductService {

    async execute(): Promise<Product[]> {

        const productRepository =  getCustomRepository(ProductsRepository)

        let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

        if(!products){
            products  =  await productRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products)
        }

        return products;

    }

}


export default ListProductService;