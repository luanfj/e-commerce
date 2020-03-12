/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateProductSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments();
      table.string('name');
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('description');
      table.decimal('price');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = CreateProductSchema;
