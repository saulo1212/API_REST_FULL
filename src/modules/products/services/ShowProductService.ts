
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
    id: string
}

class ShowProductService {

    async execute({id}:IRequest): Promise<Product> {

        const productRepository =  getCustomRepository(ProductsRepository)

        const product  = await productRepository.findOne(id);

        if(!product)
            throw new AppError('Product not found');

        return product;

    }

}


export default ShowProductService;