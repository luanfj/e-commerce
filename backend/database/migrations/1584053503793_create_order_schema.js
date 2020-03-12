/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateOrderSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments();
      table.decimal('total').defaultTo(0);
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.enu('status', [
        'pending',
        'canceled',
        'shipped',
        'paid',
        'finished',
      ]);
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = CreateOrderSchema;
