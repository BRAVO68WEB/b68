import { NextFunction, Request, Response } from 'express'
import { makeResponse } from '../libs'
import { ModRequest } from '../types'
import {
    callback,
    introspect,
    refresh,
    signon,
    revoke,
    APIKey,
    signonCLI,
    callbackCLI,
    signonApp,
    callbackApp,
} from '../auth'

export default class AuthController extends APIKey {
    public signin = (_req: Request, res: Response) => {
        const { authurl } = signon()
        res.redirect(authurl)
    }

    public signinCLI = (_req: Request, res: Response) => {
        const { authurl } = signonCLI()
        res.redirect(authurl)
    }

    public signinAPP = (_req: Request, res: Response) => {
        const { authurl } = signonApp()
        res.redirect(authurl)
    }

    public callback = async (req: Request, res: Response) => {
        const { session_state, code } = req.query as {
            session_state: string
            code: string
        }
        res.send(makeResponse(await callback(session_state, code)))
    }

    public callbackCLI = async (req: Request, res: Response) => {
        const { session_state, code } = req.query as {
            session_state: string
            code: string
        }
        res.send(makeResponse(await callbackCLI(session_state, code)))
    }

    public callbackAPP = async (req: Request, res: Response) => {
        const { session_state, code } = req.query as {
            session_state: string
            code: string
        }
        res.send(makeResponse(await callbackApp(session_state, code)))
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

    public createKey = async (req: ModRequest | any, res: Response) => {
        res.send(
            makeResponse(await this.createKeyS(req.user.userData.sub))
        ).status(201)
    }

    public fetchKey = async (req: ModRequest | any, res: Response) => {
        res.send(makeResponse(await this.fetchKeyS(req.user.userData.sub)))
    }

    public deleteKey = async (req: ModRequest | any, res: Response) => {
        res.send(
            makeResponse(await this.deleteKeyS(req.user.userData.sub))
        ).status(204)
    }

    public validateKey = async (req: ModRequest, res: Response) => {
        let api_key
        if (req.method === 'POST') {
            api_key = req.body.api_key
            if (!api_key) {
                return res
                    .status(400)
                    .send(makeResponse(null, 'Invalid api_key'))
            }
        } else if (req.method === 'GET') {
            api_key = req.headers?.['x-api-key']
            if (!api_key) {
                return res
                    .status(400)
                    .send(makeResponse(null, 'Invalid api_key'))
            }
        }
        res.send(makeResponse(await this.validateKeyS(api_key)))
    }
}
