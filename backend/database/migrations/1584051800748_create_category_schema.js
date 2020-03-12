/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateCategorySchema extends Schema {
  up() {
    this.create('categories', table => {
      table.increments();
      table.string('title');
      table.string('description');
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CreateCategorySchema;
