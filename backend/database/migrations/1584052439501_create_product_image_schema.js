/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateProductImageSchema extends Schema {
  up() {
    this.create('product_images', table => {
      table.increments();
      table
        .integer('image_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('images')
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
    this.drop('product_images');
  }
}

module.exports = CreateProductImageSchema;
