import { Router } from 'express'
import AuthController from '../controllers/auth.controller'
import { middleware, keyware } from '../auth'

const router = Router()
const authController = new AuthController()

router.get('/signin', authController.signin)

router.get('/signin/cli', authController.signinCLI)

router.get('/signin/app', authController.signinAPP)

router.get('/signin/callback', authController.callback)

router.get('/signin/callback/cli', authController.callbackCLI)

router.get('/signin/callback/app', authController.callbackAPP)

router.get('/me', middleware, authController.me as any)

router.get('/logout', middleware, authController.logout as any)

router.post('/refresh', middleware, authController.refresh as any)

router.get('/introspect', middleware, authController.introspect as any)

router.put('/key', middleware, authController.createKey as any)

router.get('/key', middleware, authController.fetchKey as any)

router.delete('/key', middleware, authController.deleteKey as any)

router.post('/key/verify', authController.validateKey as any)

router.get('/key/verify', keyware, authController.validateKey as any)

router.get('/', function (_req, res) {
    res.render('pages/auth')
})

export default router
