const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// Get all inventory items
router.route("/").get(inventoryController.index);

// Single inventory item by ID
router.route("/:id").get(inventoryController.singleInventoryID);
//delete item in an inventory
router.route("/:id").delete(inventoryController.deleteInventoryItem);
// router.route("/:id").post(inventoryController.addInventory);
// Add a new Inventory item
router.route("/").post(inventoryController.addInventory);

//Edit inventory item 
router.route('/:id').put(inventoryController.editInventoryItem)
module.exports = router;