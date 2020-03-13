/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateOrderItemSchema extends Schema {
  up() {
    this.create('order_items', table => {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('quantity').unsigned();
      table.decimal('subtotal');
      table
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('order_items');
  }
}

module.exports = CreateOrderItemSchema;
