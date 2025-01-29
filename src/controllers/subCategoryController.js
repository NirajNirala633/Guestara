import prisma from "../config/db.js";

// Create sub-category
export const createSubCategoryController = async (req, res) => {
  const { categoryId } = req.params; // Parent category ID from route parameters
  const { name, image, description, taxApplicability, tax } = req.body; // Sub-category attributes

  try {
    // Validate category ID
    if (!categoryId) {
      return res.status(400).json({
        message: "Please provide a valid category ID.",
      });
    }

    // Convert categoryId to a number
    const numericCategoryId = Number(categoryId);
    if (isNaN(numericCategoryId)) {
      return res.status(400).json({
        message: "Category ID must be a number.",
      });
    }

    // Check if the parent category exists
    const parentCategory = await prisma.category.findUnique({
      where: { id: numericCategoryId },
    });

    if (!parentCategory) {
      return res.status(404).json({
        message: `Category with ID '${categoryId}' not found.`,
      });
    }

    // Validate required fields for sub-category
    if (!name || !image || !description) {
      return res.status(400).json({
        message: "Name, Image, and Description are required fields.",
      });
    }

    // Create the sub-category
    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        image,
        description,
        taxApplicability:
          taxApplicability !== undefined
            ? taxApplicability
            : parentCategory.taxApplicability, // Default to parent category tax applicability
        tax: tax !== undefined ? tax : parentCategory.tax, // Default to parent category tax
        categoryId: numericCategoryId, // Link sub-category to the parent category
      },
    });

    // Respond with the created sub-category
    res.status(201).json({
      message: "Sub-category created successfully.",
      subCategory,
    });
  } catch (error) {
    console.error("Error creating sub-category:", error);
    res.status(500).json({
      message: "An error occurred while creating the sub-category.",
      error: error.message,
    });
  }
};

// Get all sub-categories
export const getAllSubCategoriesController = async (req, res) => {
  try {
    // Fetch all sub-categories from the database
    const subCategories = await prisma.subCategory.findMany({
      include: {
        category: true, // Include parent category information
      },
    });

    // Check if there are no sub-categories
    if (subCategories.length === 0) {
      return res.status(404).json({
        message: "No sub-categories found.",
      });
    }

    // Respond with the list of sub-categories
    res.status(200).json({
      message: "Sub-categories retrieved successfully.",
      subCategories,
    });
  } catch (error) {
    console.error("Error retrieving sub-categories:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the sub-categories.",
      error: error.message,
    });
  }
};

// Get sub-categories by category
export const getSubCategoriesByCategoryController = async (req, res) => {
  const { categoryId } = req.params; // Category ID from route parameters

  try {
    // Validate category ID
    if (!categoryId) {
      return res.status(400).json({
        message: "Please provide a valid category ID.",
      });
    }

    // Convert categoryId to a number
    const numericCategoryId = Number(categoryId);
    if (isNaN(numericCategoryId)) {
      return res.status(400).json({
        message: "Category ID must be a number.",
      });
    }

    // Fetch sub-categories under the specified category
    const subCategories = await prisma.subCategory.findMany({
      where: {
        categoryId: numericCategoryId, // Filter by the parent category ID
      },
      include: {
        category: true, // Include parent category details (optional)
      },
    });

    // Check if there are no sub-categories for the category
    if (subCategories.length === 0) {
      return res.status(404).json({
        message: `No sub-categories found under category with ID '${categoryId}'.`,
      });
    }

    // Respond with the list of sub-categories
    res.status(200).json({
      message: "Sub-categories retrieved successfully.",
      subCategories,
    });
  } catch (error) {
    console.error("Error retrieving sub-categories:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the sub-categories.",
      error: error.message,
    });
  }
};

// Get sub-category by ID
export const getSubCategoryByIdController = async (req, res) => {
  const { subCategoryId } = req.params; // Sub-category ID from route parameters

  try {
    // Validate sub-category ID
    if (!subCategoryId) {
      return res.status(400).json({
        message: "Please provide a valid sub-category ID.",
      });
    }

    // Convert sub-category ID to a number
    const numericSubCategoryId = Number(subCategoryId);
    if (isNaN(numericSubCategoryId)) {
      return res.status(400).json({
        message: "Sub-category ID must be a number.",
      });
    }

    // Fetch sub-category by ID
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: numericSubCategoryId, // Use the converted numeric ID
      },
      include: {
        category: true, // Include parent category details (optional)
      },
    });

    if (!subCategory) {
      return res.status(404).json({
        message: "Sub-category not found.",
      });
    }

    // Respond with the sub-category and its attributes
    res.status(200).json({
      message: "Sub-category retrieved successfully.",
      subCategory,
    });
  } catch (error) {
    console.error("Error retrieving sub-category:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the sub-category.",
      error: error.message,
    });
  }
};

// Edit sub-category
export const editSubCategoryController = async (req, res) => {
  const { subCategoryId } = req.params; // Sub-category ID from route parameters
  const { name, image, description, taxApplicability, tax } = req.body;

  try {
    // Validate input fields
    if (!name && !image && !description && taxApplicability === undefined && tax === undefined) {
      return res.status(400).json({
        message: "Please provide at least one attribute to update.",
      });
    }

    // Validate sub-category ID
    if (!subCategoryId) {
      return res.status(400).json({
        message: "Please provide a valid sub-category ID.",
      });
    }

    // Convert sub-category ID to a number
    const numericSubCategoryId = Number(subCategoryId);
    if (isNaN(numericSubCategoryId)) {
      return res.status(400).json({
        message: "Sub-category ID must be a number.",
      });
    }

    // Fetch the existing sub-category
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: {
        id: numericSubCategoryId, // Use the converted numeric ID
      },
    });

    if (!existingSubCategory) {
      return res.status(404).json({
        message: "Sub-category not found.",
      });
    }

    // Update the sub-category
    const updatedSubCategory = await prisma.subCategory.update({
      where: {
        id: numericSubCategoryId, // Find by sub-category ID
      },
      data: {
        name: name || existingSubCategory.name, // Use new name or retain the old one
        image: image || existingSubCategory.image, // Use new image or retain the old one
        description: description || existingSubCategory.description, // Use new description or retain the old one
        taxApplicability: taxApplicability !== undefined ? taxApplicability : existingSubCategory.taxApplicability, // If taxApplicability is provided, use it
        tax: tax !== undefined ? tax : existingSubCategory.tax, // If tax is provided, use it
      },
    });

    // Respond with the updated sub-category
    res.status(200).json({
      message: "Sub-category updated successfully.",
      subCategory: updatedSubCategory,
    });
  } catch (error) {
    console.error("Error updating sub-category:", error);
    res.status(500).json({
      message: "An error occurred while updating the sub-category.",
      error: error.message,
    });
  }
};
