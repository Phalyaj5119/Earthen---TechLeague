const express = require("express");

const app = express();
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
//const reviewRoutes = require("./routes/reviewRoutes");
const sequelize = require('./config/database'); // Path to your Sequelize instance

app.use(express.json()); // for parsing application/json

// Routes
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
//app.use("/api/reviews", reviewRoutes);

// Error handling
app.use((req, res, next) => {
res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
console.log("Server is running on port 3000");
});

// Sync the models to the database
sequelize.sync({ alter: true }) // Use `force: false` to avoid dropping tables
  .then(() => {
    console.log('Database & tables have been created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });