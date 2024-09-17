import { AuthorController } from "@controllers/authorController"
import { BookController } from "@controllers/bookController"
import { BookAuthorController } from "@controllers/book_authorController"
import { BookCategoryController } from "@controllers/book_categoryController"
import { CategoryController } from "@controllers/categoryController"
import { Router } from "express"

let router: Router = Router()

// Book
router.get("/books/all", BookController.GetAllBooks)
router.post("/books/create", BookController.CreateBook)
router.patch("/books/update", BookController.UpdateBook)
router.delete("/books/delete/:id", BookController.DeleteBook)

// Author
router.get("/authors/all", AuthorController.GetAuthorAll)
router.post("/authors/create", AuthorController.CreateAuthor)
router.patch("/authors/update", AuthorController.UpdateAuthor)
router.delete("/authors/delete/:id", AuthorController.DeleteAuthor)

// Category
router.get("/categories/all", CategoryController.GetCategoryAll)
router.post("/categories/create", CategoryController.CreateCategory)
router.patch("/categories/update", CategoryController.UpdateCategory)
router.delete("/categories/delete/:id", CategoryController.DeleteCategory)

//  BookAuthor
router.post("/book-author/create", BookAuthorController.CreateBookAuthor)

// BookCategory
router.post("/book-categories/create", BookCategoryController.CreateBookCategory)

export default router