import prisma from "../config/db.js";

// Create a new category
export const createCategoryController = async (req, res) => {
  try {
    const { name, image, description, taxApplicability, tax, taxType } =
      req.body;

    // Validate required fields
    if (!name || !description || !image) {
      return res.status(400).json({
        message: "Name, Description, and Image are required fields.",
      });
    }

    // Check if category with the same name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name, // Check for an existing category with the same name
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: `Category with the name '${name}' already exists.`,
      });
    }

    // Create a new category
    const createCategory = await prisma.category.create({
      data: {
        name,
        image,
        description,
        taxApplicability,
        tax,
        taxType,
      },
    });

    // Respond with the created category
    res.status(201).json({
      message: "Category created successfully.",
      category: createCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      message: "An error occurred while creating the category.",
      error: error.message,
    });
  }
};


// Get all categories
export const getAllCategoriesController = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await prisma.category.findMany();

    // Respond with the list of categories
    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories: categories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the categories.",
      error: error.message,
    });
  }
};

// Get category by ID
export const getCategoryByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid category ID.",
      });
    }

    // Convert ID to a number
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({
        message: "Category ID must be a number.",
      });
    }

    // Fetch category by ID
    const category = await prisma.category.findUnique({
      where: {
        id: numericId, // Use the converted numeric ID
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category doesn't exists.",
      });
    }

    // Respond with the category
    res.status(200).json({
      message: "Category retrieved successfully.",
      category,
    });
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the category.",
      error: error.message,
    });
  }
};



//  Edit a category
export const editCategoryController = async (req, res) => {
  const { id } = req.params; // Get category ID from route params
  const { name, image, description, taxApplicability, tax, taxType } = req.body; // Attributes to update

  try {
    // Validate ID
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid category ID.",
      });
    }

    // Convert ID to a number
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({
        message: "Category ID must be a number.",
      });
    }

    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: numericId },
    });

    if (!existingCategory) {
      return res.status(404).json({
        message: `Category with ID '${id}' not found.`,
      });
    }

    // Update the category
    const updatedCategory = await prisma.category.update({
      where: { id: numericId },
      data: {
        name: name || existingCategory.name, // Update only if a new value is provided
        image: image || existingCategory.image,
        description: description || existingCategory.description,
        taxApplicability:
          taxApplicability !== undefined
            ? taxApplicability
            : existingCategory.taxApplicability,
        tax: tax !== undefined ? tax : existingCategory.tax,
        taxType: taxType || existingCategory.taxType,
      },
    });

    // Respond with the updated category
    res.status(200).json({
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      message: "An error occurred while updating the category.",
      error: error.message,
    });
  }
};

