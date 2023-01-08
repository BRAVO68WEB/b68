import { Router } from 'express'
import { makeResponse } from '../../libs'
import HashnodeController from '../../controllers/hashnode.controller'

const router = Router()
const { getProfile } = new HashnodeController()

router.get('/', getProfile)

export default router
