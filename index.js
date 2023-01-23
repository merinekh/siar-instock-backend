const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
