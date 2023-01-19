import { Router } from 'express'
import MastodonController from '../../controllers/mastodon.controller'

const { fetchMastodonProfile, fetchMastodonStatuses } = new MastodonController()

const router = Router()

router.get('/profile', fetchMastodonProfile)
router.get('/statuses', fetchMastodonStatuses)

export default router
