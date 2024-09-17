import { Author, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from '@errors'


let client = new PrismaClient()

export class AuthorController {
    static async GetAuthorAll(req: Request, res: Response, next: NextFunction){
     try {
        let authors: Author[] = await client.author.findMany({
            include: {
                BookAuthor: {
                    select: {
                        book: {
                            select: {
                                title: true
                            }
                        }
                    }
                }
            }
        })
     res.status(200).send({
        success: true,
        data: authors
     })
     } catch (error: any) {
        next( new ErrorHandler(error.message, error.status))
     }
    }

    static async CreateAuthor(req: Request, res: Response, next: NextFunction){
        try {
            let {fullName}: Omit<Author, "id"> = req.body
            let authors: Author = await client.author.create({data: {fullName}})
            res.status(200).send({
                success: true,
                message: "Created Author",
                data: authors
             })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async UpdateAuthor(req: Request, res: Response, next:NextFunction){
        try {
            let { id, fullName }: Partial<Author> = req.body
        let authors: Author = await client.author.update({data: {fullName},
        where: {
            id
        }
        })
        res.status(200).send({
            success: true,
            message: "Updated Author",
            data: authors
         })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async DeleteAuthor(req: Request, res: Response, next: NextFunction){
        try {
        let { id } = req.params
        let authors: Author = await client.author.delete({where: {id: Number(id)}})
        res.status(200).send({
            success: true,
            message: "Deleted Author",
            data: authors
         })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}