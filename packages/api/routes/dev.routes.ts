import { Router } from 'express'
import { makeResponse } from '../libs'
import SpotifyController from '../controllers/spotify.controller'

const router = Router()
const { login, loginCallback } = new SpotifyController()

router.get('/', (_req, res) => {
    res.send(makeResponse({ message: 'Hello World!' }))
})

router.get('/spotify', login)
router.get('/spotify/callback', loginCallback)

router.all('/err', async (_req, _res, next) => {
    try {
        throw new Error('This is an error')
    } catch (err) {
        next(err)
    }
})

export default router
