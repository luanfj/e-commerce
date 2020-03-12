/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateCouponProductSchema extends Schema {
  up() {
    this.create('coupon_products', table => {
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
    this.drop('coupon_products');
  }
}

module.exports = CreateCouponProductSchema;
