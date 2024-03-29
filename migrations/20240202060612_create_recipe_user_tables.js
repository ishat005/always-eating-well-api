/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable("recipes", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table.string("category").notNullable();
          table.json("ingredients", 500).notNullable();
          table.string("description", 1500).notNullable();
          table.string("image").notNullable();
          table.string("procedure", 2000).notNullable();
      })
      .createTable("user", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("recipes").dropTable("recipes");
  };
  

  