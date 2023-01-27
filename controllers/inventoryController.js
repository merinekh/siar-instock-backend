const knex = require("knex")(require("../knexfile"));

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
      // If record is not found, respond with 404
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

exports.addInventory = (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).send("Please return all the needed fields");
  }
  knex("inventories")
    .insert(req.body)
    .then((data) => {
      const newInventoryURL = `/inventories/${data[0]}`;
      res.status(201).location(newInventoryURL).send(newInventoryURL);
    })
    .catch((err) =>
      res.status(400).send(`Error creating Inventory item: ${err}`)
    );
};
