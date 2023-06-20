import { NextFunction, Response } from 'express'
import { authClient } from '../helpers/auth_client'
import { ModRequest } from '../types'
import { CustomError } from '../libs/error'

export const revoke = async (
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
        await authClient.revoke(token)
        return 'Token revoked! Logged out!'
    } catch (err) {
        next(
            new CustomError({
                message: 'Invalid token',
                statusCode: 401,
            })
        )
    }
}
