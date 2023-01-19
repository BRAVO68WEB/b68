import { makeResponse } from '../libs'
import MastodonService from '../services/mastodon.service'
import { Request, Response } from 'express'

export default class MastodonController extends MastodonService {
    public fetchMastodonProfile = async (req: Request, res: Response) => {
        const data = await this.getMastodonProfile()
        return res.send(makeResponse(data))
    }

    public fetchMastodonStatuses = async (req: Request, res: Response) => {
        const data = await this.getMastodonStatuses()
        return res.send(makeResponse(data))
    }
}
