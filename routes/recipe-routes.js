const router = require('express').Router();
const recipeController = require('../controllers/recipe-controller');

router.route('/')
  .get(recipeController.index)  //retrieve all recipes
  .post(recipeController.add);  //add a recipe

router.route("/:id")
  .get(recipeController.findOne)  //find recipe id

  module.exports = router;