import { Router } from 'express'
import LastFMController from '../../controllers/lastfm.controller'

const { fetchTop, fetchCurrent, fetchLoved, fetchUser } = new LastFMController()

const router = Router()

router.get('/', fetchUser)
router.get('/top', fetchTop)
router.get('/loved', fetchLoved)
router.all('/current', fetchCurrent)

export default router
