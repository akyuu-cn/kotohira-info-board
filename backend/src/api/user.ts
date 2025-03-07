import { Request, Response } from "express-serve-static-core"
import { list } from "../user.js"

export function auth(req: Request, res: Response) {
    const json = req.body
    const user = list.find(u => u.username === json.username && u.password === json.password)
    if (user) {
        res.send({ "success": true })
    } else {
        res.send({ "success": false })
    }
}
