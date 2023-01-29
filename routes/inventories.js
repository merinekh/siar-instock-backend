const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// Get all inventory items
router.route("/").get(inventoryController.index);

// Single inventory item by ID
router.route("/:id").get(inventoryController.singleInventoryID);
//delete item in an inventory
router.route('/:id').delete(inventoryController.deleteInventoryItem)

// Add a new Inventory item
router.route("/").post(inventoryController.addInventory);

//Edit inventory item 
router.route('/:id').patch(inventoryController.editInventoryItem)
module.exports = router;