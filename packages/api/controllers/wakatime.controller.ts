import WakatimeService from '../services/wakatime.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class Wakatime extends WakatimeService {
    public profile = async (_req: Request, res: Response) => {
        try {
            const data = await this.getWakatimeStats()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public last7DaysLanguages = async (_req: Request, res: Response) => {
        try {
            const data = await this.getWakatimeLanguageUsageInLast7Days()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public last7DaysCode = async (_req: Request, res: Response) => {
        try {
            const data = await this.getWakatimeCodeStatsLast7Days()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public allTimeCode = async (_req: Request, res: Response) => {
        try {
            const data = await this.getWakatimeCodeStatesAllTime()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
