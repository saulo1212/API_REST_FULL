import OrdersProducts from '../../../../orders/infra/typeorm/entities/OrdersProducts';
import {Column, CreateDateColumn, OneToMany, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('products')
class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    order_products : OrdersProducts[];

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Product;