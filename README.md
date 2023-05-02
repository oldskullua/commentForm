# ts/type-orm express project.

## !!! DONT USE ON PRODUCTION. !!!
Edit database options in `src/data-source.ts`

Steps to run this project:

1. Run `npm i` command
2. Set the database options in the following environment variables.
    - TYPEORM_HOST, TYPEORM_PORT - the hostname and port number for database server.
    - TYPEORM_DATABASE - name of database,
    - TYPEORM_USER - username
    - TYPEORM_PASSWORD - password
3. Run `npm start` command

Use the utils like packman for testing 

## Supported api
`POST /api/:productId/comments` - save a comment in database 

Params:
- `productId: number` - the commented product id

Body: 
- `name: string` - the name of the comment author.
- `email: string` - the e-mail of the comment author.
- `description: string` - the comment.
- `rating: number` - the rating.

Response:

if success HTTP Status is 200 and `body` contain the same data as in the request

if the product with `productId` is not found, HttpStatus is 404

if the `productId` is not a number, HttpStatus is 404