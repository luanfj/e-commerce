/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Coupon = use('App/Models/Coupon');
const Database = use('Database');
const Service = use('App/Services/Coupon/CouponService');

class CouponController {
  async index({ request, response, pagination }) {
    const code = request.input('code');

    const query = Coupon.query();

    if (code) {
      query.where('code', 'ILIKE', `%${code}%`);
    }

    const coupons = await query.paginate(pagination.page, pagination.limit);

    return response.send(coupons);
  }

  async store({ request, response }) {
    const canUseFor = {
      client: false,
      product: false,
    };

    const trx = await Database.beginTransaction();

    try {
      const data = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive',
      ]);

      const { users, products } = request.only(['users', 'products']);

      const coupon = await Coupon.create({ ...data }, trx);

      const service = new Service(coupon, trx);

      if (users && users.length > 0) {
        await service.syncUsers(users);
        canUseFor.client = true;
      }

      if (products && products.length > 0) {
        await service.syncProducts(products);
        canUseFor.product = true;
      }

      if (canUseFor.product && canUseFor.client) {
        coupon.can_use_for = 'product_client';
      } else if (canUseFor.product && canUseFor.client) {
        coupon.can_use_for = 'product';
      } else if (!canUseFor.product && canUseFor.client) {
        coupon.can_use_for = 'client';
      } else {
        coupon.can_use_for = 'all';
      }

      await coupon.save(trx);

      await trx.commit();

      return response.status(201).send(coupon);
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async show({ params: { id }, response }) {
    const coupon = await Coupon.findOrFail(id);

    return response.send(coupon);
  }

  async udate({ params: { id }, request, response }) {
    const trx = await Database.beginTransaction();

    const coupon = await Coupon.findOrFail(id);

    const canUseFor = {
      client: false,
      product: false,
    };

    try {
      const data = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive',
      ]);

      coupon.merge({ ...data });

      const { users, products } = request.only(['users', 'products']);

      const service = new Service(coupon, trx);

      if (users && users.length > 0) {
        await service.syncUsers(users);
        canUseFor.client = true;
      }

      if (products && products.length > 0) {
        await service.syncProducts(products);
        canUseFor.product = true;
      }

      if (canUseFor.product && canUseFor.client) {
        coupon.can_use_for = 'product_client';
      } else if (canUseFor.product && canUseFor.client) {
        coupon.can_use_for = 'product';
      } else if (!canUseFor.product && canUseFor.client) {
        coupon.can_use_for = 'client';
      } else {
        coupon.can_use_for = 'all';
      }

      await coupon.save(trx);

      await trx.commit();

      return response.status(201).send(coupon);
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();

    const coupon = await Coupon.findOrFail(id);

    try {
      await coupon.products().detach([], trx);
      await coupon.orders().detach([], trx);
      await coupon.users().detach([], trx);
      await coupon.delete(trx);

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

module.exports = CouponController;
