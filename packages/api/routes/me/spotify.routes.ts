import { Router } from 'express'
import SpotifyController from '../../controllers/spotify.controller'

const router = Router()
const { fetchSpotifyTopSongs } = new SpotifyController()

router.get('/top', fetchSpotifyTopSongs)

export default router
