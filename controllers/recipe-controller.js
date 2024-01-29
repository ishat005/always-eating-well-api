const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
      const data = await knex('recipes');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Recipes: ${err}`)
    }
  }

  const findOne = async (req, res) => {
    try {
      const recipesFound = await knex("recipes")
        .where({ id: req.params.id });
  
      if (recipesFound.length === 0) {
        return res.status(404).json({
          message: `Recipe with ID ${req.params.id} not found` 
        });
      }
  
    const recipeData = recipesFound[0];
      res.json(recipeData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve recipe data for recipe with ID ${req.params.id}`,
        });
    }
  }; 
  
  const add = async (req, res) => {
    if (!req.body.name || !req.body.category || !req.body.ingredients || 
        !req.body.description || !req.body.image || !req.body.procedure) {
      return res.status(400).json({
        message: "Please provide name, category, ingredients, description, image, and procedure for the recipe in the request",
      });
    }
  
    try {
      const result = await knex("recipes").insert({...req.body, "ingredients":JSON.stringify(req.body.ingredients)});
  
      const newRecipeId = result[0];
      const createdRecipe = await knex("recipes").where({ id: newRecipeId });
  
      res.status(201).json(createdRecipe);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new recipe: ${error}`,
      });
    }
  };

module.exports = {
    index,
    findOne,
    add,
  }