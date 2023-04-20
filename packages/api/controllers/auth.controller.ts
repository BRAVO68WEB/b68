import { Request, Response } from 'express'
import { makeResponse } from '../libs'
import check from '../auth/check'
import verify from '../auth/verify'
import { ModRequest } from '../types'

export default class AuthController {
    public signin = (req: Request, res: Response) => {
        const { authurl } = check()
        res.redirect(authurl)
    }

    public callback = async (req: Request, res: Response) => {
        const { session_state, code } = req.query as { session_state: string, code: string}
        res.send(makeResponse(await verify(session_state, code)))
    }

    public me = (req: ModRequest, res: Response) => {
        res.send(makeResponse(req.user))
    }
}