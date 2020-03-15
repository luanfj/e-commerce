/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Coupon = use('App/Models/Coupon');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Discount = use('App/Models/Discount');

const Database = use('Database');

const Service = use('App/Services/Order/OrderService');

class ApplyDiscountController {
  async store({ params: { id }, request, response }) {
    const { code } = request.all();

    const coupon = await Coupon.findByOrFail('code', code.toUpperCase());

    const order = await Order.findOrFail(id);

    const info = {};

    try {
      const service = new Service(order);
      const canAddDiscount = await service.canApplyDiscount(coupon);
      const orderDiscounts = await order.coupons().getCount();

      const canApplyToOrder =
        orderDiscounts < 1 || (orderDiscounts >= 1 && coupon.recursive);

      if (canAddDiscount && canApplyToOrder) {
        await Discount.findOrCreate({
          order_id: order.id,
          coupon_id: coupon.id,
        });

        info.message = 'Coupon successfully applied';
        info.success = true;
      } else {
        info.message = 'Coupon could not be applied';
        info.success = false;
      }

      return response.send({ order, info });
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();

    const discount = await Discount.findOrFail(id);

    try {
      await discount.delete(trx);

      await trx.commit();

      return response.status(204).send();
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }
}

module.exports = ApplyDiscountController;
