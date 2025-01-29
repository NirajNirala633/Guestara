import express from "express";

// Import the category controllers
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  editCategoryController
} from "../controllers/categoryController.js";

// router object
const router = express.Router();


// Swagger documentation
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               taxType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// Route to create a new category
router.post("/create", createCategoryController);


// Swagger documentation
/**
 * @swagger
 * /category/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       500:
 *         description: Internal server error
 */
// Route to get all categories
router.get("/categories", getAllCategoriesController);

// Swagger documentation
/**
 * @swagger
 * /category/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
// Route to get a category by ID
router.get("/category/:id", getCategoryByIdController);

// Swagger documentation
/**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               taxType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
// Route to update a category
router.put("/update/:id", editCategoryController);

export default router;
