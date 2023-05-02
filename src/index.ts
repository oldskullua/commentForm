import * as express from "express"
import * as bodyParser from "body-parser"
import * as path from 'path'
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(express.static(path.resolve(process.cwd(), 'public')));
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
    app.listen(3000, () => {
        console.log('Server has started and listen on 127.0.0.1:3000');
    })

}).catch(error => console.log(error))
