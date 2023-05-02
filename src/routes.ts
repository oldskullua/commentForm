import { CommentController } from "./controller/CommentController"


export const Routes = [
    {
        method: "post",
        route: '/api/:productId/comments',
        controller: CommentController,
        action: 'save',
    },
]

