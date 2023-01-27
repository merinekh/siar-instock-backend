const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};
exports.singleWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};
exports.singleWarehouseInventories = (req, res) => {
  knex
    .select("warehouses.*", "inventories.*")
    .from("warehouses")
    .where({ ["warehouses.id"]: req.params.id })
    .join("inventories", "inventories.warehouse_id", "warehouses.id")
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving Warehouse ${req.params.id} inventory: ${err}`)
    );
};
exports.editWarehuse = (req, res) => {};
