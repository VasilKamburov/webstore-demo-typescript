import { Order } from 'src/orders/models/order.entity';
import { User } from 'src/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  additionalNotes: string;

  @ManyToOne(() => User, (user) => user.addresses, {eager: true})
  user: User;

  @OneToMany(() => Order, (order) => order.address, {eager: true})
  orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  dateModified: Date;
}
