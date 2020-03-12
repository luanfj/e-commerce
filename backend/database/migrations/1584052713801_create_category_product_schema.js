/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateCategoryProductSchema extends Schema {
  up() {
    this.create('category_products', table => {
      table.increments();
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('category_products');
  }
}

module.exports = CreateCategoryProductSchema;
