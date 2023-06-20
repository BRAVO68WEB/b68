import HashnodeService from '../services/hashnode.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class HashnodeController extends HashnodeService {
    public getProfile = async (_req: Request, res: Response) => {
        try {
            const data = await this.getHashnodeProfile()
            res.send(makeResponse(data))
        } catch (err: any) {
            res.send(makeResponse(err.message, {}, 'Failed', true))
        }
    }
}
