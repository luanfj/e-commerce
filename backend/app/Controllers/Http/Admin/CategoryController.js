/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

class CategoryController {
  async index({ request, response, pagination }) {
    const title = request.input('title');

    const query = Category.query();

    if (title) {
      query.where('title', 'ILIKE', `%${title}%`);
    }

    const categories = await query.paginate(pagination.page, pagination.limit);

    return response.send(categories);
  }

  async store({ request, response }) {
    try {
      const data = request.only(['title', 'description', 'image_id']);

      const category = await Category.create({ ...data });

      return response.status(201).send(category);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async show({ params: { id }, response }) {
    const category = await Category.findOrFail(id);

    return response.send(category);
  }

  async update({ params: { id }, request, response }) {
    const category = await Category.findOrFail(id);

    try {
      const data = request.only(['title', 'description', 'image_id']);

      category.merge({ ...data });

      await category.save();

      return response.send(category);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const category = await Category.findOrFail(id);

    await category.delete();

    return response.status(204).send();
  }
}

module.exports = CategoryController;
