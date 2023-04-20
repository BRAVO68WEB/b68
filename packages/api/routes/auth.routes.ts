import { Router } from 'express'
import AuthController from '../controllers/auth.controller'
import middleware from '../auth/middleware'

const router = Router()
const authController = new AuthController()

router.get('/signin', authController.signin)

router.get('/signin/callback', authController.callback)

router.get('/me', middleware, authController.me as any)

router.get('/', function(req, res) {
    res.render('pages/auth');
});

export default router
