import { NextFunction, Request, Response } from 'express'
import { makeResponse } from '../libs'
import { ModRequest } from '../types'
import { callback, introspect, refresh, signon, revoke } from '../auth/index'

export default class AuthController {
    public signin = (req: Request, res: Response) => {
        const { authurl } = signon()
        res.redirect(authurl)
    }

    public callback = async (req: Request, res: Response) => {
        const { session_state, code } = req.query as {
            session_state: string
            code: string
        }
        res.send(makeResponse(await callback(session_state, code)))
    }

    public me = (req: ModRequest, res: Response) => {
        res.send(makeResponse(req.user.userData))
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        res.send(makeResponse(await revoke(req, res, next)))
    }

    public refresh = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.send(makeResponse(await refresh(req, res, next)))
    }

    public introspect = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.send(makeResponse(await introspect(req, res, next)))
    }
}
