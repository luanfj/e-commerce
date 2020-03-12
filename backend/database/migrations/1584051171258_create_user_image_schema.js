/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateUserImageSchema extends Schema {
  up() {
    this.create('user_image', table => {
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
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_image');
  }
}

module.exports = CreateUserImageSchema;
