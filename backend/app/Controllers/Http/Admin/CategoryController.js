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
}

module.exports = CategoryController;
