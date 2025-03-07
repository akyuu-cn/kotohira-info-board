import { Request, Response } from "express-serve-static-core"

export function ping(req: Request, res: Response) {
    const _ ={
        success: true,
        message: "Potato is here!!!!"
    }
    res.status(200).send(_)
}