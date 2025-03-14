import express from "express";
import { Product } from "../models/productModel.js";

const router = express.Router();

// CREATE ALL PRODUCTS ROUTE
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.priceInCents ||
      !request.body.image ||
      !request.body.description ||
      !request.body.category
    ) {
      return response
        .status(400)
        .json({ message: "Required fields are missing" });
    }

    const newProduct = {
      name: request.body.name,
      priceInCents: request.body.priceInCents,
      image: request.body.image,
      description: request.body.description,
      category: request.body.category,
    };

    const product = await Product.create(newProduct);
    return response.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET ALL PRODUCTS ROUTE
router.get("/", async (request, response) => {
  try {
    const product = await Product.find();

    return response.status(200).json({ data: product });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET SINGLE PRODUCT ROUTE
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const product = await Product.findById(id);

    response.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE SINGLE PRODUCT ROUTE
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    response
      .status(200)
      .json({ message: "Product deleted successfully", deletedItem: product });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// UPDATE SINGLE PRODUCT ROUTE
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.priceInCents ||
      !request.body.description ||
      !request.body.category
    ) {
      response.status(400).send({ message: "Required fields are missing" });
    }

    const { id } = request.params;

    const result = await Product.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).send({ message: "Product not found" });
    }

    return response
      .status(200)
      .send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
