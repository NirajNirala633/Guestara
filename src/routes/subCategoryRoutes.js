import express from "express";
import {
  createSubCategoryController,
  getAllSubCategoriesController,
  getSubCategoriesByCategoryController,
  getSubCategoryByIdController,
  editSubCategoryController,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// Swagger documentation
/**
 * @swagger
 * /sub-category/category/{categoryId}/create:
 *   post:
 *     summary: Create a sub-category under a specific category
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: number
 *         required: true
 *         description: Parent category ID
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
 *     responses:
 *       201:
 *         description: Sub-category created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
// Route to create a sub-category
router.post(
  "/category/:categoryId/create",
  (req, res, next) => {
    const categoryId = Number(req.params.categoryId);
    console.log("Category ID received:", req.params.categoryId); // Debug log

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Category ID must be a number." });
    }

    req.params.categoryId = categoryId; // Ensure it's a number
    next();
  },
  createSubCategoryController
);

// Route to get all sub-categories
/**
 * @swagger
 *  /sub-category/sub-categories:
 *   get:
 *     summary: Fetch all sub-categories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: Sub-categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: No sub-categories found.
 *       500:
 *         description: Internal server error.
 */
// Route to get all sub-categories
router.get("/sub-categories", getAllSubCategoriesController);


// Swagger documentation
/**
 * @swagger
 * /sub-category/category/{categoryId}/sub-categories:
 *   get:
 *     summary: Fetch all sub-categories under a specific category
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the parent category
 *     responses:
 *       200:
 *         description: Sub-categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subCategories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request, invalid category ID.
 *       404:
 *         description: No sub-categories found under the category.
 *       500:
 *         description: Internal server error.
 */
// Route to get sub-categories by category
router.get("/category/:categoryId/sub-categories", (req, res, next) => {
  req.params.categoryId = Number(req.params.categoryId);
  if (isNaN(req.params.categoryId)) {
    return res.status(400).json({ message: "Category ID must be a number." });
  }
  next();
}, getSubCategoriesByCategoryController);

// Swagger documentation
/**
 * @swagger
 * /sub-category/subcategory/{subCategoryId}:
 *   get:
 *     summary: Fetch a sub-category by its ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sub-category ID
 *     responses:
 *       200:
 *         description: Sub-category retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subCategory:
 *                   $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request, invalid sub-category ID.
 *       404:
 *         description: Sub-category not found.
 *       500:
 *         description: Internal server error.
 */
// Route to get sub-category by ID
router.get("/subcategory/:subCategoryId", getSubCategoryByIdController);

// Swagger documentation
/**
 * @swagger
 * /sub-category/subcategory/{subCategoryId}:
 *   put:
 *     summary: Edit sub-category attributes by its ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sub-category ID
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
 *     responses:
 *       200:
 *         description: Sub-category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subCategory:
 *                   $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request, invalid inputs or sub-category ID.
 *       404:
 *         description: Sub-category not found.
 *       500:
 *         description: Internal server error.
 */
// Route to edit sub-category
router.put("/subcategory/:subCategoryId", editSubCategoryController);

export default router;
