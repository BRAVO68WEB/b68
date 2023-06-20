import { NextFunction, Response } from 'express'
import { authClient } from '../helpers/auth_client'
import { ModRequest } from '../types'
import { CustomError } from '../libs/error'

export const middleware = async (
    req: ModRequest | any,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers?.authorization?.split(' ')
        if (!authHeader) {
            throw new Error('No authorization header')
        }
        const token: string = authHeader[1]
        const decoded = await authClient.introspect(token)
        const user = await authClient.userinfo(token, {
            method: 'GET',
            tokenType: 'Bearer',
            params: {
                access_token: token,
            },
            via: 'header',
        })

        if (!user) {
            throw new Error('No user')
        }

        req.user = {
            userData: user,
            tokenData: decoded,
        }
        next()
    } catch (err) {
        next(
            new CustomError({
                message: 'Invalid token',
                statusCode: 401,
            })
        )
    }
}
