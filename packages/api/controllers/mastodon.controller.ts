import { makeResponse } from '../libs'
import MastodonService from '../services/mastodon.service'
import { Request, Response } from 'express'

export default class MastodonController extends MastodonService {
    public fetchMastodonProfile = async (_req: Request, res: Response) => {
        try {
            const data = await this.getMastodonProfile()
            return res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public fetchMastodonStatuses = async (_req: Request, res: Response) => {
        try {
            const data = await this.getMastodonStatuses()
            return res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
