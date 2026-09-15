const mongoose = require("mongoose");

// 1) Schema definition
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0.01
        },

        category: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true      
        // automatically gives the document:
        // createdAt
        // updatedAt
    }
);

// 2) Model (document collection)
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

/*
Example Product Object: {
    "_id": "...",
    "name": "Mechanical Keyboard",
    "description": "RGB mechanical keyboard with blue switches.",
    "price": 2999,
    "category": "Electronics",
    "image": "https://example.com/keyboard.jpg",
    "stock": 10,
    "createdAt": "...",
    "updatedAt": "..."
}
 */