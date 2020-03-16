/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('users', 'UserController.store')
    .middleware(['guest'])
    .validator('Auth/Register');

  Route.post('sessions', 'SessionController.store')
    .middleware(['guest'])
    .validator('Auth/Login');

  Route.post('token/refresh', 'TokenController.store').middleware(['guest']);
  Route.post('token/destroy', 'TokenController.destroy').middleware(['auth']);
})
  .prefix('v1/auth')
  .namespace('Auth');
