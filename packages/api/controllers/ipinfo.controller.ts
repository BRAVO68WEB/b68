import IPInfo from '../services/ipinfo.service'
import { Request, Response, NextFunction } from 'express'

const { getIPInfo } = new IPInfo()

export default class IPInfoController {
    public async fetchCurrentIPInfo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const ip =
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                req.ip
            const data = await getIPInfo(ip as string)
            res.status(200).json(data)
        } catch (error: any) {
            next(error)
        }
    }

    public async fetchIPInfo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { ip } = req.params
            const data = await getIPInfo(ip)
            res.status(200).json(data)
        } catch (error: any) {
            next(error)
        }
    }
}
