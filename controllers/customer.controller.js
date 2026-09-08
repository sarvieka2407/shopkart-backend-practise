// first step: imports
const Customer = require("../models/customer.model");
const bcrypt = require("bcrypt");


// async as we re doing DB operations which are asynchronous in nature, we need to use async/await to handle them properly
const registerCustomer = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        // Validate input
        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check for duplicate email
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create customer
        const customer = await Customer.create({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        // Send response without password
        return res.status(201).json({
            message: "Customer registered successfully",
            customer: {
                id: customer._id,
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    registerCustomer
};