import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#main/infrastructure/controllers/auth_controller')
router
  .group(() => {
    // TODO: setup OAuth for Google and Linkedin
    router.post('/register', [AuthController, 'registerUser'])
    router.post('/login', [AuthController, 'loginUser'])
    router.post('/logout', [AuthController, 'logoutUser'])
  })
  .prefix('/auth')

router
  .group(() => {})
  .use(middleware.auth())
  .prefix('/api')
