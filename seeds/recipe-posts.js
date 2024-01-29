/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const recipesData = require('../seeds-data/recipe');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del();
  await knex('recipes').insert(recipesData);
};
