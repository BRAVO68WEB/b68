import { Router } from 'express'
import DiscordController from '../../controllers/discord.controller'

const router = Router()
const { getProfile, getBanner, getActivity, getPresence } =
    new DiscordController()

router.get('/profile', getActivity)
router.get('/banner', getBanner)

router.get('/v2/profile', getProfile)
router.get('/v2/activity', getPresence)

export default router
