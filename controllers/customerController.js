const { Customer } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new customer
exports.registerCustomer = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  
  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new customer
    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    // Respond with the new customer
    res.status(201).json(newCustomer);

  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ message: "Error registering customer", error: err.message || err });
  }
};

// Login customer
exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: customer.userId }, "secretKey", { expiresIn: "1h" });
    
    // Respond with the token
    res.status(200).json({ token });

  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ message: "Error logging in", error: err.message || err });
  }
};