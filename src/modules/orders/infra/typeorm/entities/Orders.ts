import Customer from '../../../../customers/infra/typeorm/entities/Customers';
import OrdersProducts from './OrdersProducts';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('orders')
export default class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @OneToMany(() => OrdersProducts, order_products => order_products.order,{
        cascade:true
    })
    order_products : OrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
