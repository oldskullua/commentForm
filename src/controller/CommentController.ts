import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product";
import { Comment } from "../entity/Comment";

export class CommentController {
    private productRepository = AppDataSource.getRepository(Product);
    private commentRepository = AppDataSource.getRepository(Comment);

    /**
     * Validate and save comment to database.
     * @param {number} request.params.productId - id of comented product
     * @param { Comment }  request.params.body - comment data.
     */
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, description, rating } = request.body;
            // Перевірка, якщо productId NAN, то повернути повідомлення про помилку
            const productId = parseInt(request.params.productId);
            if (Number.isNaN(productId)) {
                response.status(400);
                return {
                    error: 'Bad Request',
                    reason: "The `productId` should be a `Number`"
                }
            };

            // Спробувати повернути продукт, до якого пишуть комент
            // Якщо такий знайти не вдається - повідомити про помилку
            const product = await this.productRepository.findOneBy({ id: productId });  
            if (!product) {
                response.status(404);
                return {
                    error: 'Not Found',
                    reason: `The product, whose id is ${productId} isn't exists`
                }
            }

            // Cтворити комент
            /** ТУТ ТРЕБА ВАЛІДАЦІЮ ЩЕ РЕАЛІЗУВАТИ*/
            const comment = Object.assign(new Comment(), {
                name,
                email,
                description,
                rating,
                product
            });

            // зберегти комент в БД.
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

    /**
     * Fetch comments from database.
     */
    async get(request: Request, response: Response, next: NextFunction) {
        
    }
}