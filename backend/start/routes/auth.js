/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('users', 'UserController.store');

  Route.post('sessions', 'SessionController.store');

  Route.post('token/refresh', 'TokenController.store');
  Route.post('token/destroy', 'TokenController.destroy');
})
  .prefix('v1/auth')
  .namespace('Auth');
