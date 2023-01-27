const express = require("express");
const router = express.Router();
const fs = require("fs");

const warehouseController = require("../controllers/warehouseController");

// Get all warehouses
router.route("/").get(warehouseController.index);

//Single warehouse
router.route("/:id").get(warehouseController.singleWarehouse);
//Return specific warehouse items by warehouse ID
router
  .route("/:id/inventories")
  .get(warehouseController.singleWarehouseInventories);

// ==================create a POST request for new Video==========================================

router
  .route("/") //
  .post(warehouseController.addWarehouse);

module.exports = router;
