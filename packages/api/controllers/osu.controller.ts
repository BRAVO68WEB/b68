import OsuService from '../services/osu.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class OsuController extends OsuService {
    public fetchUser = async (_req: Request, res: Response) => {
        try {
            const data = await this.getOsuSelf()
            res.send(makeResponse(data))
        } catch (error: any) {
            res.send(makeResponse(error.message, {}, 'Failed', true))
        }
    }

    public fetchBestScores = async (_req: Request, res: Response) => {
        try {
            const data = await this.bestScoresSelf()
            res.send(makeResponse(data))
        } catch (error: any) {
            res.send(makeResponse(error.message, {}, 'Failed', true))
        }
    }

    public fetchFavBeatmaps = async (_req: Request, res: Response) => {
        try {
            const data = await this.favouriteBeatmapsSelf()
            res.send(makeResponse(data))
        } catch (error: any) {
            res.send(makeResponse(error.message, {}, 'Failed', true))
        }
    }

    public fetchRecentScores = async (_req: Request, res: Response) => {
        try {
            const data = await this.recentScoresSelf()
            res.send(makeResponse(data))
        } catch (error: any) {
            res.send(makeResponse(error.message, {}, 'Failed', true))
        }
    }
}
