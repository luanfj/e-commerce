/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('User');

class ClientSeeder {
  async run() {
    const role = await Role.findBy('slug', 'cliente');
    const clients = await Factory.model('App/Models/User').createMany(30);

    await Promise.all(
      clients.map(async client => {
        await client.roles().attach([role.id]);
      })
    );

    const user = await User.create({
      name: 'Luan',
      surname: 'Fernandes',
      email: 'luan@seed.com.br',
      password: 'senha',
    });

    const adminRole = await Role.findBy('slug', 'administrador');

    await user.roles().attach([adminRole.id]);
  }
}

module.exports = ClientSeeder;
