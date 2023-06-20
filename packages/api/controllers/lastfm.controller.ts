import LastfmService from '../services/lastfm.service'
import { Response, Request } from 'express'
import { makeResponse } from '../libs'

export default class LastFMController extends LastfmService {
    public fetchUser = async (_req: Request, res: Response) => {
        try {
            const data = await this.user()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public fetchTop = async (_req: Request, res: Response) => {
        try {
            const data = await this.top()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public fetchLoved = async (_req: Request, res: Response) => {
        try {
            const data = await this.loved()
            res.send(makeResponse(data))
        } catch (error: any) {
            res.send(makeResponse(error.message, {}, 'Failed', true))
        }
    }

    public fetchCurrent = async (_req: Request, res: Response) => {
        const data = await this.current()
        res.send(data)
    }
}
