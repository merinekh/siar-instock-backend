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

exports.singleWarehouse = (_req, res) => {
  knex("warehouses")
  .where({ id: _req.params.id})
  .then((data) => {
    res.status(200).json(data);
    
  })
  .catch((err) =>
    res.status(400).send(`Error retrieving Warehouses: ${err}`)
  );
}

exports.deleteWarehouse = (_req, res) => {
  knex("warehouses")
  .delete()
  .where({id: _req.params.id})
    .then(() => {
      res.status(204).send(`Warehouse with id: ${_req.params.id} has been deleted`);
    })
    .catch((err) =>
    res.status(400).send(`Error deleting Warehouse ${_req.params.id} ${err}`)
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
