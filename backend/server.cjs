const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

let db;
let productsCollection;
let ordersCollection;

// ==================== MIDDLEWARE ====================

app.use(cors());
app.use(express.json());

// ==================== TEST ROUTE ====================

app.get("/", (req, res) => {
  res.json({
    message: "DukaanDost Backend is running successfully!"
  });
});

// ==================== PRODUCTS ====================

const products = [
  {
    id: 1,
    name: "Football",
    price: 2500,
    category: "Football",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Cricket Bat",
    price: 4500,
    category: "Cricket",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Tennis Racket",
    price: 5500,
    category: "Tennis",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 4,
    name: "Sports Shoes",
    price: 6000,
    category: "Shoes",
    image: "https://via.placeholder.com/200"
  }
];

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await productsCollection
      .find({})
      .toArray();

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

// Add product
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Name, price and category are required"
      });
    }

    const lastProduct = await productsCollection
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const newId =
      lastProduct.length > 0
        ? lastProduct[0].id + 1
        : 1;

    const newProduct = {
      id: newId,
      name,
      price: Number(price),
      category,
      image: image || "https://via.placeholder.com/200"
    };

    await productsCollection.insertOne(newProduct);

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct
    });
  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      message: "Failed to add product"
    });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deletedProduct =
      await productsCollection.findOneAndDelete({
        id: id
      });

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
});

// ==================== ORDERS ====================

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await ordersCollection
      .find({})
      .sort({ id: -1 })
      .toArray();

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
});

// Add order
app.post("/api/orders", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      items,
      total
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Customer information and order items are required"
      });
    }

    const lastOrder = await ordersCollection
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const newId =
      lastOrder.length > 0
        ? lastOrder[0].id + 1
        : 1;

    const newOrder = {
      id: newId,
      customerName,
      phone,
      address,
      items,
      total: Number(total),
      status: "Pending",
      createdAt: new Date()
    };

    await ordersCollection.insertOne(newOrder);

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.error("Add order error:", error);

    res.status(500).json({
      message: "Failed to place order"
    });
  }
});

// Update order status
app.put("/api/orders/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Order status is required"
      });
    }

    const result = await ordersCollection.updateOne(
      { id: id },
      {
        $set: {
          status: status
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    const updatedOrder =
      await ordersCollection.findOne({
        id: id
      });

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Update order error:", error);

    res.status(500).json({
      message: "Failed to update order status"
    });
  }
});

// ==================== SERVER ====================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await client.connect();

    db = client.db(process.env.DB_NAME);

    productsCollection = db.collection("products");
    ordersCollection = db.collection("orders");

    // Add default products only if collection is empty
    if (await productsCollection.countDocuments() === 0) {
      await productsCollection.insertMany(products);
      console.log("Default products added to MongoDB.");
    }

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

startServer();