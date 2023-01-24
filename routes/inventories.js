const express = require("express");
const router = express.Router();
const fs = require("node:fs");

//Convenience function to grab data
const getInventoryItem = () => {
  const inventoryFromFile = fs.readFileSync("./data/dummy-inventory-item.json");
  return JSON.parse(inventoryFromFile);
};

//Return single inventory item by ID
router.get("/:id", (req, res) => {
  const inventories = getInventoryItem();

  const inventory = inventories.find((item) => +item.id === +req.params.id);
  res.json(inventory);
});

module.exports = router;