import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Comment } from "./Comment"

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(_ => Comment, comment => comment.product)
    comments: Comment[]
}
