/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('users', 'UserController.store');

  Route.post('sessions', 'SessionController.store');
})
  .prefix('v1/auth')
  .namespace('Auth');
