import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Size } from "./size.enum";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column({ type: 'enum', enum: Size, default: Size.MEDIUM })
    size: Size;

    @Column({ length: 50, nullable: false })
    colour: string;

    @Column({ type: 'int', default: 0 })
    quantityAvailable: number;

    @Column({ length: 255, nullable: true })
    photoUrl: string;

    @CreateDateColumn({ type: 'timestamp' })
    dateCreated: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    dateUpdated: Date;
}