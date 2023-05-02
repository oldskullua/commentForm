import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    description: string

    @Column()
    rating: string

    @ManyToOne(_ => Product, product => product.comments)
    product: Product

}
