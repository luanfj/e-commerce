/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

class ProductController {
  async index({ request, response, pagination }) {
    const name = request.input('name');

    const query = Product.query();

    if (name) {
      query.where('name', 'ILIKE', `%${name}%`);
    }

    const products = await query.paginate(pagination.page, pagination.limit);

    return response.send(products);
  }

  async store({ request, response }) {
    try {
      const data = request.only(['name', 'description', 'price', 'image_id']);

      const product = await Product.create({ ...data });

      return response.status(201).send(product);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async show({ params: { id }, response }) {
    const product = await Product.findOrFail(id);

    return response.send(product);
  }

  async update({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id);

    try {
      const data = request.only(['name', 'description', 'price', 'image_id']);

      product.merge({ ...data });

      await product.save();

      return response.send(product);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const product = await Product.findOrFail(id);

    try {
      await product.delete();

      return response.status(204).send();
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Error processing your request.' });
    }
  }
}

module.exports = ProductController;
