import { Router } from 'express'
import IPController from '../../controllers/ipinfo.controller'

const router = Router()
const ipController = new IPController()

router.get('/current', ipController.fetchCurrentIPInfo)
router.get('/:ip', ipController.fetchIPInfo)

export default router
