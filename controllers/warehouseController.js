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
<<<<<<< HEAD

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

=======
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
>>>>>>> develop
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

exports.addWarehouse = (req, res) => {
  // Validate the request body for required data
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide name, manager, address, phone and email fields in a request"
      );
  }

  knex("warehouse")
    .insert(req.body)
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      const newWarehouseURL = `/warehouses/${data[0]}`;
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};
exports.editWarehuse = (req, res) => {};
