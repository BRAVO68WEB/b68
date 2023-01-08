import { Router } from 'express'
import { makeResponse } from '../../libs'
import TwitterController from '../../controllers/twitter.controller'

const router = Router()
const { getProfile, getTweets } = new TwitterController()

router.get('/profile', getProfile)
router.get('/tweets', getTweets)

export default router
