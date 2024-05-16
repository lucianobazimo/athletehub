/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * The error handler is used to convert an exception
 * to a HTTP response.
 */
server.errorHandler(() => import('./exceptions/exception_handler.js'))

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  () => import('../middleware/container_bindings_middleware.js'),
  () => import('../middleware/force_json_response_middleware.js'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('../middleware/detect_user_locale_middleware.js'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
])

export const middleware = router.named({
  auth: () => import('#shared/infrastructure/middleware/auth_middleware'),
  guest: () => import('#shared/infrastructure/middleware/guest_middleware'),
})
