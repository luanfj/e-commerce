/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async index({ request, response, pagination }) {
    const name = request.input('name');

    const query = User.query();

    if (name) {
      query
        .where('name', 'ILIKE', `%${name}%`)
        .orWhere('surname', 'ILIKE', `%${name}%`)
        .orWhere('email', 'ILIKE', `%${name}%`);
    }

    const users = await query.paginate(pagination.page, pagination.limit);

    return response.send(users);
  }

  async store({ request, response }) {
    try {
      const data = request.only([
        'name',
        'surname',
        'email',
        'password',
        'image_id',
      ]);

      const user = await User.create({ ...data });

      return response.status(201).send(user);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async show({ params: { id }, response }) {
    const user = await User.findOrFail(id);

    return response.send(user);
  }

  async update({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);

    try {
      const data = request.only([
        'name',
        'surname',
        'email',
        'password',
        'image_id',
      ]);

      user.merge({ ...data });

      await user.save();

      return response.send(user);
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Error processing your request.' });
    }
  }

  async destroy({ params: { id }, response }) {
    const user = await User.findOrFail(id);

    try {
      await user.delete();

      return response.status(204).send();
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Error processing your request.' });
    }
  }
}

module.exports = UserController;
