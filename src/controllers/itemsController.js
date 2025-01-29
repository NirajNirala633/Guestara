import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new item
export const createItemController = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
      subCategoryId,
      categoryId,
    } = req.body;

    // Validate required fields
    if (!name || !baseAmount || !totalAmount || !subCategoryId || !categoryId) {
      return res.status(400).json({
        message: "Name, Base Amount, Total Amount, SubCategoryId, and CategoryId are required",
      });
    }

    // Convert subCategoryId and categoryId to integers
    const subCategoryIdInt = parseInt(subCategoryId, 10);
    const categoryIdInt = parseInt(categoryId, 10);

    // Check if item with the same name already exists
    const existingItem = await prisma.item.findFirst({
      where: { name },
    });

    if (existingItem) {
      return res.status(400).json({ message: "Item with the same name already exists" });
    }

    // Create new item
    const newItem = await prisma.item.create({
      data: {
        name,
        image,
        description,
        taxApplicability,
        tax,
        baseAmount,
        discount,
        totalAmount,
        subCategoryId: subCategoryIdInt,
        categoryId: categoryIdInt,
      },
    });

    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all items
export const getAllItemsController = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json({ message: "All items", items });
  } catch (error) {
    console.error("Error fetching all items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get items by category
export const getItemsByCategoryController = async (req, res) => {
  try {
    console.log("Received query params:", req.query); // Debugging
    const { categoryId } = req.query; // Get categoryId from query parameters

    // Validate categoryId
    if (!categoryId || isNaN(parseInt(categoryId, 10))) {
      return res.status(400).json({ message: "Valid CategoryId is required" });
    }

    const categoryIdInt = parseInt(categoryId, 10);

    const items = await prisma.item.findMany({
      where: { categoryId: categoryIdInt },
    });

    res.status(200).json({ message: "Items fetched successfully", items });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get items by sub-category 
export const getItemsBySubCategoryController = async (req, res) => {
  try {
    console.log("Request Query:", req.query); // Debugging: Log query params

    const { subcategoryId } = req.query;

    // Validate subcategoryId
    if (!subcategoryId || isNaN(Number(subcategoryId))) {
      return res.status(400).json({ message: "Valid SubCategoryId is required" });
    }

    const subCategoryIdInt = parseInt(subcategoryId, 10);

    const items = await prisma.item.findMany({
      where: { subCategoryId: subCategoryIdInt },
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found for this sub-category" });
    }

    res.status(200).json({ message: "Items fetched successfully", items });
  } catch (error) {
    console.error("Error fetching items by sub-category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get item by ID
export const getItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const itemId = parseInt(id, 10);

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item fetched successfully", item });
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update item
export const updateItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
      subCategoryId,
    } = req.body;

    // Validate id
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const itemId = parseInt(id, 10);

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        name,
        image,
        description,
        taxApplicability,
        tax,
        baseAmount,
        discount,
        totalAmount,
        subCategoryId,
      },
    });

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete item
export const searchItemByNameController = async (req, res) => {
  try {
    console.log("Request Object:", req); // Log the entire request object
    console.log("Request Query:", req.query); // Log query parameters

    const { name } = req.query;

    // Validate name
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Valid name is required" });
    }

    const items = await prisma.item.findMany({
      where: {
        name: {
          contains: name, // This will match partial names
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json({ message: "Items fetched successfully", items });
  } catch (error) {
    console.error("Error searching for items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
