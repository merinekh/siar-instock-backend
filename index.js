const express = require("express");
const app = express();
require("knex")(require("./knexfile"));

require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5656;


const inventories = require("./routes/inventories");
const warehouses = require("./routes/warehouses");

app.use(cors());
app.use(express.json());

app.use("/api/warehouses", warehouses);
app.use("/api/inventories", inventories);

app.listen(port, () => console.log(`🚀 Listening on port ${port}...`));
