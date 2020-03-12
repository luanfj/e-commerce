/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CreateCouponSchema extends Schema {
  up() {
    this.create('coupons', table => {
      table.increments();
      table.string('code').notNullable();
      table.dateTime('valid_from');
      table.dateTime('valid_until');
      table.integer('quantity').defaultTo(1);
      table.enu('can_use_for', ['product', 'client', 'product_client', 'all']);
      table.enu('type', ['free', 'percent', 'currency']).defaultTo('currency');
      table.boolean('recursive').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('coupons');
  }
}

module.exports = CreateCouponSchema;
