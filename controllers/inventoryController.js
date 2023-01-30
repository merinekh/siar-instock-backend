const { restart } = require("nodemon");

const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex
    .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
    .from("inventories")
    .join("warehouses", "warehouses.id", "inventories.warehouse_id")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};

exports.deleteInventoryItem = (req, res) => {
  knex
    .select("inventory.id")
    .from("inventories")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(204)
        .send(`Inventory item with the id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error deleting inventory item ${req.params.id} ${err}`)
    );
};

exports.singleInventoryID = (req, res) => {
  knex
    .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
    .from("inventories")
    .where({ ["inventories.id"]: req.params.id })
    .join("warehouses", "warehouses.id", "inventories.warehouse_id")
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving Inventory item ID ${req.params.id} ${err}`)
    );
};

exports.editInventoryItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .update(req.body)
    .then((rowsUpdated) => {
      res.status(200).json(rowsUpdated);
    })
    .catch((err) =>
      res.status(400).send(`Error updating inventory items ${err}`)
    );
};

exports.addInventory = async (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).send("Please return all the needed fields");
  }
  try {
    const warehouseId = await knex("warehouses")
      .where("warehouse_name", req.body.warehouse)
      .select("id");
    await knex("inventories").insert({
      id: uuidv4(),
      item_name: req.body.item_name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
      warehouse_id: warehouseId[0].id,
    });
    res.status(201).json({ message: "Inventory item added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding inventory item" });
  }
};
