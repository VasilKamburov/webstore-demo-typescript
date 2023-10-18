import { Address } from 'src/addresses/models/address.entity';
import { Order } from 'src/orders/models/order.entity';
import { Product } from 'src/products/models/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @ManyToMany(() => Product)
  @JoinTable()
  wishlist: Product[];

  @ManyToMany(() => Product)
  @JoinTable()
  cart: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  dateUpdated: Date;
}
