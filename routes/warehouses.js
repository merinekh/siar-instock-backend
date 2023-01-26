const express = require("express");
const router = express.Router();

const warehouseController = require("../controllers/warehouseController");

// Get all warehouses
router.route("/").get(warehouseController.index);

//Return specific warehouse items by ID
router.route("/:id/inventories").get();

module.exports = router;
