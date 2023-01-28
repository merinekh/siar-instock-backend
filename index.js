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

app.use((req, res, next) => {
    if (
      req.method === "POST" || "PUT" &&
      req.headers["content-type"] !== "application/json"
    ) {
      return res.status(400).json({
        error: true,
        message: "This API only accepts JSON data for a POST/PUT requset body",
      });
    }
  
    next();
  });

app.listen(port, () => console.log(`🚀 Listening on port ${port}...`));
