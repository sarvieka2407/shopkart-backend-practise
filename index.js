// import required modules 
const express = require("express"); // express frameowrk ~~ fastapi


const mongoose = require("mongoose");

// import routes
const customerRoutes = require("./routes/customer.routes");

const cookieParser = require("cookie-parser");

require("dotenv").config();


// app instantiation
const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/customers", customerRoutes);


// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// 
// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "ShopKart API is running"
    });
});


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});