const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex("inventories")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
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
// exports.singleInventoryID = (req, res) => {
//   knex("inventories")
//     .where({ id: req.params.id })
//     .then((data) => {
//       // If record is not found, respond with 404
//       if (!data.length) {
//         return res
//           .status(404)
//           .send(`Record with id: ${req.params.id} is not found`);
//       }
//       res.status(200).json(data[0]);
//     })
//     .catch((err) =>
//       res
//         .status(400)
//         .send(`Error retrieving Inventory item ID ${req.params.id} ${err}`)
//     );
// };
