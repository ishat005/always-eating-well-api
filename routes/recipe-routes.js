const router = require('express').Router();
const recipeController = require('../controllers/recipe-controller');

router.route('/')
  .get(recipeController.index)  //retrieve all recipes
  .post(recipeController.add);  //add a user

router.route("/:id")
  .get(recipeController.findOne)  //find user id

  module.exports = router;