import DiscordService from '../services/discord.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class DiscordController extends DiscordService {
    public getProfile = async (req: Request, res: Response) => {
        try {
            const data = await this.activity()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public getBanner = async (req: Request, res: Response) => {
        try {
            const data = await this.banner()
            res.setHeader('content-type', 'image/svg+xml; charset=utf-8').send(
                data
            )
        } catch (error: any) {
            res.send(makeResponse(error.message, {}, 'Failed', true))
        }
    }
}
