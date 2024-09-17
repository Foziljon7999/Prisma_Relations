import { BookAuthor, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from '@errors'
const client = new PrismaClient()

export class BookAuthorController{
    static async CreateBookAuthor(req: Request, res: Response, next: NextFunction){
        try {
            let { bookId, authorId }: BookAuthor = req.body
            let bookAuthors = await client.bookAuthor.create({data: {bookId, authorId}})
            res.status(200).send({
                success: true,
                message: "Created BookAuthor",
                data: bookAuthors
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}