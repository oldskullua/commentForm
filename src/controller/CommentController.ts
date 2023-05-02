import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product";
import { Comment } from "../entity/Comment";

export class CommentController {
    private productRepository = AppDataSource.getRepository(Product);
    private commentRepository = AppDataSource.getRepository(Comment);

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, description, rating } = request.body;
            // if request.params.productId 
            const productId = parseInt(request.params.productId);
            if (Number.isNaN(productId)) {
                response.status(400);
                return {
                    error: 'Bad Request',
                    reason: "The `productId` should be a `Number`"
                }

            };

            const product = await this.productRepository.findOneBy({ id: productId });
                
            if (!product) {
                response.status(404);
                return {
                    error: 'Not Found',
                    reason: `The product, whose id is ${productId} isn't exists`
                }
            }

            const comment = Object.assign(new Comment(), {
                name,
                email,
                description,
                rating,
                product
            });
            return this.commentRepository.save(comment);
        }
        catch (e) {
            console.error(e.message);
            response.status(500);
            return {
                error: 'Internal Server Error'
            }
        }
    }

    async get(request: Request, response: Response, next: NextFunction) {
        
    }
}