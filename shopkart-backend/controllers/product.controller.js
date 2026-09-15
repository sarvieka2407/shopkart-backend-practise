const Product = require("../models/product.model");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            image,
            stock
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock
        });

        return res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Create product error:", error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get all products
const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        const query = {};

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query).select(
            "name price category image stock"
        );

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get products error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get a single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get product error:", error);

        return res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById
};