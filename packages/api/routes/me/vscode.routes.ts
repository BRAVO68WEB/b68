import { Router } from 'express'
import VSCodeController from '../../controllers/vscode.controller'

const { fetchList } = new VSCodeController()

const router = Router()

router.get('/', fetchList)

export default router
