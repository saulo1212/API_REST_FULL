
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "../../../shared/cache/RedisCache";


class ListProductService {

    async execute(): Promise<Product[]> {

        const productRepository =  getCustomRepository(ProductsRepository)

        const rediscache  = new RedisCache();

        let products = await rediscache.recover<Product[]>('api-vendas-PRODUCT_LIST');

        if(!products){
            products  =  await productRepository.find();

            await rediscache.save('api-vendas-PRODUCT_LIST', products)
        }


        return products;

    }

}


export default ListProductService;