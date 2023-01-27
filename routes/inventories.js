const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// Get all inventory items
router.route("/").get(inventoryController.index);

// Single inventory item by ID
router.route("/:id").get(inventoryController.singleInventoryID);
// Add a new Inventory item
router.route("/").post(inventoryController.addInventory);
module.exports = router;
