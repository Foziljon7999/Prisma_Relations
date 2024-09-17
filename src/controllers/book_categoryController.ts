import { BookCategory, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from '@errors'

const client = new PrismaClient()

export class BookCategoryController{
    static async CreateBookCategory(req: Request, res: Response, next: NextFunction){
        try {
            let { bookId, categoryId }: Omit<BookCategory, "id"> = req.body
            let bookCategory = await client.bookCategory.create({data:{bookId, categoryId}})
            res.status(200).send({
                success: true,
                message: "Created BookCategory",
                data: bookCategory
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}