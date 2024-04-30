/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#main/infrastructure/controllers/auth_controller')
router
  .group(() => {
    router.post('/register', [AuthController, 'registerUser'])
    router.post('/login', [AuthController, 'loginUser'])
    router.post('/logout', [AuthController, 'logoutUser'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/test', () => 'Hello world')
  })
  .use(middleware.auth())
  .prefix('/api')
