const express = require("express");
const app = express();
require("knex")(require("./knexfile"));

require("dotenv").config();

const port = process.env.PORT || 8081;
const cors = require("cors");

const inventories = require("./routes/inventories");
const warehouses = require("./routes/warehouses");

app.use(cors());
app.use(express.json());

app.use("/api/inventories", inventories);
app.use("/api/warehouses", warehouses);

app.listen(port, () => console.log(`🚀 Listening on port ${port}...`));
