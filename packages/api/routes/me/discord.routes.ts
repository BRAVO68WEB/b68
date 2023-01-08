import { Router } from 'express'
import DiscordController from '../../controllers/discord.controller'

const router = Router()
const { getProfile, getBanner } = new DiscordController()

router.get('/profile', getProfile)
router.get('/banner', getBanner)

export default router
