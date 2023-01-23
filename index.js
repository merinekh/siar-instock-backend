const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8081;
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
