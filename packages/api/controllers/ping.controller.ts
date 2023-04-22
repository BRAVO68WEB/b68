import { Request, Response } from 'express'
import { makeResponse } from '../libs'
import PingService from '../services/ping.service'

export default class PingController extends PingService {
    public ping = async (req: Request, res: Response) => {
        try {
            const { host } = req.query as { host: string }
            const data = await this.pingHost(host)
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public pingParallel = async (req: Request, res: Response) => {
        try {
            const { hosts } = req.query as { hosts: string }
            const data = await this.pingHostsParallel(hosts.split(','))
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public pingAll = async (req: Request, res: Response) => {
        try {
            const { hosts } = req.query as { hosts: string }
            const data = await this.pingHosts(hosts.split(','))
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }

    public pingSelf = async (req: Request, res: Response) => {
        try {
            const locIps = ['::1', '::ffff:', '127.0.0.1', 'localhost']
            if (locIps.includes(req.ip))
                return res.send(makeResponse('localhost', {}, 'Failed', true))
            const data = await this.pingHost(req.ip)
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
