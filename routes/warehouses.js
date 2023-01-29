const express = require("express");
const router = express.Router();
const fs = require("fs");

const warehouseController = require("../controllers/warehouseController");

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

router
  .route("/:id")
  .get(warehouseController.singleWarehouse)
  .delete(warehouseController.deleteWarehouse)
  .put(warehouseController.editWarehouse);

router
  .route("/:id/inventories")
  .get(warehouseController.singleWarehouseInventories);

module.exports = router;
