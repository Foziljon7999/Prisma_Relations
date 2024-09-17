import { NextFunction, Request, Response } from "express";
import { PrismaClient, Book} from '@prisma/client'
import { ErrorHandler } from '@errors'

let client = new PrismaClient()

export class BookController {
    static async GetAllBooks(req: Request, res: Response, next: NextFunction){
    try {
        let books: Book[] = await client.book.findMany({
            include: {
                BookAuthor: {
                    select: {
                        author: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).send({
            success: true,
            data: books
        })
    } catch (error: any) {
        next(new ErrorHandler(error.message, error.status))
    }
    }

    static async CreateBook(req: Request, res: Response, next: NextFunction){
        try {
            let {title}: Omit<Book, "id"> = req.body
            let books: Book = await client.book.create({data: {title}})
            res.status(200).send({
                success: true,
                message: "Created Book",
                data: books
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
        }

    static async UpdateBook(req: Request, res: Response, next: NextFunction){
        try {
            let { id, title }: Partial<Book> = req.body
            let books: Book = await client.book.update({data: {
                title
            }, where: {
                id
            }
        })
        res.status(200).send({
            success: true,
            message: "Updated Book",
            data: books
        })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async DeleteBook(req: Request, res: Response, next: NextFunction){
        try {
            let { id } = req.params
            let books: Book = await client.book.delete({where: {id: Number(id)}})
            res.status(200).send({
                success: true,
                message: "Deleted Book",
                data: books
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}