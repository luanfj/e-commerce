/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('orders', 'OrderController.index');
  Route.get('orders/:id', 'OrderController.show');
  Route.post('orders', 'OrderController.store');
  Route.put('orders/:id', 'OrderController.update');

  Route.get('products', 'ProductController.index');
  Route.get('products/:id', 'ProductController.show');
})
  .prefix('v1/client')
  .namespace('Client');
