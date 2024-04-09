/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#main/infrastructure/controllers/auth_controller')
router
  .group(() => {
    router.post('/register', [AuthController, 'registerUser'])
    router.post('/login', [AuthController, 'loginUser'])
  })
  .prefix('/auth')
