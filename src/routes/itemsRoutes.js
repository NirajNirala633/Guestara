import express from "express";
import {
  createItemController,
  getAllItemsController,
  getItemsBySubCategoryController,
  getItemsByCategoryController,
  getItemByIdController,
  updateItemController,
  searchItemByNameController
} from "../controllers/itemsController.js";

const router = express.Router();

// Swagger documentation
/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * /item/create:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
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
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               subCategoryId:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// Route to create a new item
router.post("/create", createItemController);

// Swagger documentation
/**
 * @swagger
 * /item/all:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: All items
 *       500:
 *         description: Server error
 */
// Route to get all items
router.get("/all", getAllItemsController);

// Swagger documentation
/**
 * @swagger
 * /item/sub-category:
 *   get:
 *     summary: Get items by sub-category
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: SubCategory ID
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *       400:
 *         description: Valid SubCategoryId is required
 *       404:
 *         description: No items found for this sub-category
 *       500:
 *         description: Server error
 */
// Route to get items by sub-category
router.get("/sub-category", getItemsBySubCategoryController);

// Swagger documentation
/**
 * @swagger
 * /item/category:
 *   get:
 *     summary: Get items by category
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *       400:
 *         description: Valid CategoryId is required
 *       500:
 *         description: Server error
 */
// Route to get items by category
router.get("/category", getItemsByCategoryController);

// Swagger documentation
/**
 * @swagger
 * /item/get/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item fetched successfully
 *       400:
 *         description: Valid ID is required
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
// Route to get item by ID
router.get("/get/:id", getItemByIdController);

// Swagger documentation
/**
 * @swagger
 * /item/update/{id}:
 *   put:
 *     summary: Update item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Item ID
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
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               subCategoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Valid ID is required
 *       500:
 *         description: Server error
 */
// Route to update item
router.put("/update/:id", updateItemController);

// Swagger documentation
/**
 * @swagger
 * /item/search:
 *   get:
 *     summary: Search items by name
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Item name
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *       400:
 *         description: Valid name is required
 *       404:
 *         description: No items found
 *       500:
 *         description: Server error
 */
// Route to search items by name
router.get('/search', searchItemByNameController);

export default router;
