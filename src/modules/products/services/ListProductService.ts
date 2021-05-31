
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";


class ListProductService {

    async execute(): Promise<Product[]> {

        const productRepository =  getCustomRepository(ProductsRepository)

        const products  = productRepository.find();

        return products;

    }

}


export default ListProductService;