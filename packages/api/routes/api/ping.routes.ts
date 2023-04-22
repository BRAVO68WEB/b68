import { Router } from 'express'
import PingController from '../../controllers/ping.controller'

const router = Router()
const pingController = new PingController()

router.get('/', pingController.ping)
router.get('/parallel', pingController.pingParallel)
router.get('/all', pingController.pingAll)
router.get('/self', pingController.pingSelf)

export default router
