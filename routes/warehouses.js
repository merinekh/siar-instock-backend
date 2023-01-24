const express = require("express");
const router = express.Router();
const fs = require("node:fs");

//Convenience function to grab data
const getWarehouseItems = (id) => {
  const warehouseFromFile = fs.readFileSync(
    `./data/dummy-warehouse-${id}.json`
  );
  return JSON.parse(warehouseFromFile);
};

//Return specific warehouse items
router.get("/:id", (req, res) => {
  let id = req.params.id;
  const warehouse = getWarehouseItems(id);

  res.json(warehouse);
});

module.exports = router;
