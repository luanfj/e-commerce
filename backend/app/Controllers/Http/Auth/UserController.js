const Database = use('Database');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');

class UserController {
  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const { name, surname, email, password } = request.all();

      const user = await User.create(
        {
          name,
          surname,
          email,
          password,
        },
        trx
      );

      const clientRole = Role.findBy('slug', 'client');

      await user.roles().attach([clientRole.id], null, trx);

      await trx.commit();

      return response.status(201).send({ data: user });
    } catch (error) {
      await trx.rollback();

      return response.status(400).send({ message: 'An error has occurred.' });
    }
  }
}

module.exports = UserController;
