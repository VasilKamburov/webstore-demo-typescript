import { Address } from 'src/addresses/models/address.entity';
import { Product } from 'src/products/models/product.entity';
import { User } from 'src/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;

  @ManyToMany(() => Product)
  @JoinTable()
  cart: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;
}
