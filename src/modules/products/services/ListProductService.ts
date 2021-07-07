
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "../../../shared/cache/RedisCache";


class ListProductService {

    async execute(): Promise<Product[]> {

        const rediscache  = new RedisCache();

        const productRepository =  getCustomRepository(ProductsRepository)

        const products  = productRepository.find();

        await rediscache.save('teste', 'teste');

        return products;

    }

}


export default ListProductService;