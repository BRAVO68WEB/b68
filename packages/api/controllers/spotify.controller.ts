import SpotifyService from '../services/spotify.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class SpotifyController extends SpotifyService {
    public login = async (_req: Request, res: Response) => {
        const data = await this.loginAuth()
        res.redirect(data)
    }

    public loginCallback = async (req: Request, res: Response) => {
        const data = await this.loginAuthCallback(req.query.code as string)
        res.send(data)
    }

    public fetchSpotifyTopSongs = async (_req: Request, res: Response) => {
        try {
            const data = await this.getSpotifyTopSongs()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
