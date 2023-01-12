import { Router } from 'express'
import OsuController from '../../../controllers/osu.controller'

const router = Router()
const { fetchBestScores, fetchFavBeatmaps, fetchRecentScores, fetchUser } =
    new OsuController()

router.get('/user', fetchUser)
router.get('/best', fetchBestScores)
router.get('/recent', fetchRecentScores)
router.get('/fav', fetchFavBeatmaps)

export default router
