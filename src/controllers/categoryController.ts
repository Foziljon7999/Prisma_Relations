import { Category, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "@errors"

const client = new PrismaClient()

export class CategoryController{
    static async GetCategoryAll(req: Request, res: Response, next: NextFunction){
    try {
    let categories: Category[] = await client.category.findMany({
        include: {
            BookCategory: {
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
            data: categories
            })
    } catch (error: any) {
        next(new ErrorHandler(error.message, error.status))
        }
    }

    static async CreateCategory(req: Request, res: Response, next: NextFunction){
        try {
            let { name }: Omit<Category, "id"> = req.body
            let categories: Category = await client.category.create({data: {name}}) 
            res.status(200).send({
                success: true,
                message: "Created Category",
                data: categories
                })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async UpdateCategory(req: Request, res: Response, next: NextFunction){
        try {
            let { id, name }: Partial<Category> = req.body
            let categories: Category = await client.category.update({data: {name},
                where: {
                    id
                }
            }) 
            res.status(200).send({
                success: true,
                message: "Updated Category",
                data: categories
                })
        } catch (error: any) {
            next( new ErrorHandler(error.message, error.status))
        }
    }

    static async DeleteCategory(req: Request, res: Response, next: NextFunction){
        try {
            let { id } = req.params
            let categories: Category = await client.category.delete({where: {
                id: Number(id)
            }})
            res.status(200).send({
                success: true,
                message: "Deleted Category",
                data: categories
                })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}