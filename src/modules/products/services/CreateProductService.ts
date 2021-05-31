
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

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

        await productRepository.save(product);


        return product;

    }

}


export default CreateProductService;