import 'reflect-metadata';
import  CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

describe('CreateCustomer',  () => {

    it('should be able to create a new customer', async () => {

        const fakeCustomersRepository = new  FakeCustomersRepository();

        const createCustomer = new CreateCustomerService(fakeCustomersRepository);

        const customer =  await createCustomer.execute({
            name:'saulo',
            email: 'sau-lode@outlook.com'
        });

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to create two customer with the same email', async () => {
        const fakeCustomersRepository = new  FakeCustomersRepository();

        const createCustomer = new CreateCustomerService(fakeCustomersRepository);

        await createCustomer.execute({
            name:'saulo',
            email: 'sau-lode@outlook.com'
        });

        expect(
            createCustomer.execute({
                name:'saulo',
                email: 'sau-lode@outlook.com'
            })
        ).rejects.toBeInstanceOf(AppError)
    });

});