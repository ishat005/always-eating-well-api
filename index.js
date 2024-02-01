const express = require('express');
const app = express();
const recipeRoutes = require('./routes/recipe-routes');
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// all recipes route
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});