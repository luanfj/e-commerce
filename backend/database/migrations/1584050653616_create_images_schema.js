/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateImagesSchema extends Schema {
  up() {
    this.create('images', table => {
      table.increments();
      table.string('path');
      table.integer('size').unsigned();
      table.string('original_name');
      table.string('extension');
      table.timestamps();
    });
  }

  down() {
    this.drop('images');
  }
}

module.exports = CreateImagesSchema;
