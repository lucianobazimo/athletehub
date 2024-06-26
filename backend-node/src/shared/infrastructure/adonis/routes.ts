import router from '@adonisjs/core/services/router'
import { middleware } from '#shared/infrastructure/adonis/kernel'

const AuthController = () => import('#main/infrastructure/controllers/auth_controller')
router
  .group(() => {
    // TODO: setup OAuth for Google and Linkedin
    router.post('/register', [AuthController, 'registerUser'])
    router.post('/login', [AuthController, 'loginUser'])
    router.post('/logout', [AuthController, 'logoutUser'])
    router
      .post('/checkToken', [AuthController, 'checkTokenStatus'])
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/auth')

router.get('/', () => 'hello world pignouf')

router
  .group(() => {
    router.get('/', () => 'hello world')
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
  .prefix('/api')
