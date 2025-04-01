require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

require("./src/database/connection");
require("./src/database/setup")();

app.use(
  "/api/categories",
  require("./src/modules/product-management/routes/categoryRoutes")
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
