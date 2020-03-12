/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateCouponOrderSchema extends Schema {
  up() {
    this.create('coupon_order', table => {
      table.increments();
      table
        .integer('coupon_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('coupons')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('discount').defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('coupon_order');
  }
}

module.exports = CreateCouponOrderSchema;
