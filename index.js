const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8081;
const cors = require("cors");

const inventories = require("./routes/inventories");
const warehouses = require("./routes/inventories");

app.use(cors());
app.use(express.json());

app.use("/api/inventories", inventories);
app.use("/api/warehouses", warehouses);

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
