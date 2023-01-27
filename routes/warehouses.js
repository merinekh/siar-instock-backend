const express = require("express");
const router = express.Router();

const warehouseController = require("../controllers/warehouseController");

// Get all warehouses
router.route("/").get(warehouseController.index);

//Return specific warehouse items by warehouse ID
router
  .route("/:id/inventories")
  .get(warehouseController.singleWarehouseInventories)
  
router
.route('/:id')
.get(warehouseController.singleWarehouse)
.delete(warehouseController.deleteWarehouse);
module.exports = router;
