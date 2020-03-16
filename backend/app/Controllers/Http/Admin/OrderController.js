/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Order = use('App/Models/Order');
const Database = use('Database');

const Service = use('App/Services/Order/OrderService');

class OrderController {
  async index({ request, response, pagination }) {
    const { status, id } = request.only(['status', 'id']);

    const query = Order.query();

    if (status && id) {
      query.where('status', status).orWhere('id', 'ILIKE', `%${id}%`);
    } else if (status) {
      query.where('status', status);
    } else if (id) {
      query.orWhere('id', 'ILIKE', `%${id}%`);
    }

    const orders = await query.paginate(pagination.page, pagination.limit);

    return response.send(orders);
  }

  async store(request, response) {
    const trx = await Database.beginTransaction();

    try {
      const { userId, items, status } = request.all();

      const order = await Order.create({ userId, status }, trx);

      const service = new Service(order, trx);

      if (items && items.length > 0) {
        await service.syncItems(items);
      }

      await trx.commit();

      return response.status(201).send(order);
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async show({ params: { id }, response }) {
    const order = await Order.findOrFail(id);

    return response.send(order);
  }

  async update({ params: { id }, request, response }) {
    const order = await Order.findOrFail(id);

    const trx = await Database.beginTransaction();

    try {
      const { userId, items, status } = request.all();

      order.merge({ userId, status }, trx);

      const service = new Service(order, trx);

      await service.updateItems(items);

      await order.save(trx);

      await trx.commit();

      return response.send(order);
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const order = await Order.findOrFail(id);

    const trx = await Database.beginTransaction();

    try {
      await order.delete(trx);

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

module.exports = OrderController;
