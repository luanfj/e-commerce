/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('Role');

class RoleSeeder {
  async run() {
    await Role.create({
      name: 'Administrador',
      slug: 'administrador',
      description: 'Administrador da loja',
    });

    await Role.create({
      name: 'Gerente',
      slug: 'gerente',
      description: 'Gerente da loja',
    });

    await Role.create({
      name: 'Cliente',
      slug: 'cliente',
      description: 'Cliente da loja',
    });
  }
}

module.exports = RoleSeeder;
