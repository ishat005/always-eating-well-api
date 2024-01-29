const express = require('express');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5050;

// basic home route
// app.get('/', (req, res) => {
//   res.send('Welcome to my API');
// });

const recipeRoutes = require('./routes/recipe-routes');

app.use(express.json());

// all recipes routes
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});