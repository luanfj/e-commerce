/* eslint-disable no-restricted-syntax */
const DiscountHook = (exports = module.exports = {});

const Coupon = use('App/Models/Coupon');
const Order = use('App/Models/Order');
const Database = use('Database');

DiscountHook.calculateValues = async model => {
  // eslint-disable-next-line no-unused-vars
  let couponProducts = [];
  let discountItems = [];

  model.discount = 0;

  const coupon = await Coupon.find(model.coupon_id);
  const order = await Order.find(model.order_id);

  switch (coupon.can_use_for) {
    case 'product_client' || 'product':
      couponProducts = await Database.find('coupon_product')
        .where('coupon_id', model.coupon_id)
        .pluck('coupon_id');

      discountItems = await Database.find('order_items')
        .where('order_id', model.coupon_id)
        .pluck('order_id');

      if (coupon.type === 'percent') {
        for (const orderItem of discountItems) {
          model.discount += (orderItem / 100) * coupon.discount;
        }
      } else if (coupon.type === 'currency') {
        for (const orderItem of discountItems) {
          model.discount += coupon.discount * orderItem.quantity;
        }
      } else {
        for (const orderItem of discountItems) {
          model.discount += orderItem.subtotal;
        }
      }
      break;

    default:
      if (coupon.type === 'percent') {
        model.discount += (order.subtotal / 100) * coupon.discount;
      } else if (coupon.type === 'currency') {
        model.discount += coupon.discount;
      } else {
        model.discount += order.subtotal;
      }
      break;
  }
};

DiscountHook.decrementCoupons = async model => {
  const query = Database.from('coupons');

  if (model.$transaction) {
    query.transacting(model.$transaction);
  }

  await query.where('id', model.coupon_id).decrement('quantity', 1);
};

DiscountHook.incrementCoupons = async model => {
  const query = Database.from('coupons');

  if (model.$transaction) {
    query.transacting(model.$transaction);
  }

  await query.where('id', model.coupon_id).increment('quantity', 1);
};
